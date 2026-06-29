# ============================================================
# Stage 1: PHP dependencies
# ============================================================
FROM php:8.4-fpm-alpine AS php-base

# Install system dependencies & PHP extensions
RUN apk add --no-cache \
    nginx \
    supervisor \
    curl \
    libpng-dev \
    libjpeg-turbo-dev \
    freetype-dev \
    libzip-dev \
    icu-dev \
    oniguruma-dev \
    libxml2-dev \
    sqlite-dev \
    && docker-php-ext-configure gd --with-freetype --with-jpeg \
    && docker-php-ext-install -j$(nproc) \
        gd \
        pdo_sqlite \
        pdo_mysql \
        bcmath \
        zip \
        intl \
        exif \
        mbstring \
        xml \
        opcache \
    && rm -rf /var/cache/apk/*

# Install Composer
COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

WORKDIR /var/www/html

# Copy composer files first for layer caching
COPY composer.json composer.lock ./
RUN composer install --no-dev --no-scripts --no-autoloader --prefer-dist

# Copy the rest of the application
COPY . .

# Run composer autoload & scripts
RUN composer dump-autoload --optimize \
    && composer run-script post-autoload-dump 2>/dev/null || true

# ============================================================
# Stage 2: Build frontend assets
# ============================================================
FROM node:22-alpine AS node-build

WORKDIR /var/www/html

# Copy package files first for layer caching
COPY package.json package-lock.json ./
RUN npm ci

# Copy source files needed for build
COPY resources/ resources/
COPY vite.config.js tsconfig.json ./
COPY public/ public/

# Build production assets
RUN npm run build

# ============================================================
# Stage 3: Production image
# ============================================================
FROM php-base AS production

# Copy built frontend assets from node stage
COPY --from=node-build /var/www/html/public/build public/build

# Copy Fly deployment configs
COPY .fly/nginx.conf /etc/nginx/http.d/default.conf
COPY .fly/php-fpm.conf /usr/local/etc/php-fpm.d/www.conf
COPY .fly/entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

# PHP production config
RUN mv "$PHP_INI_DIR/php.ini-production" "$PHP_INI_DIR/php.ini"

# Configure OPcache for production
RUN echo "opcache.enable=1" >> $PHP_INI_DIR/conf.d/opcache.ini \
    && echo "opcache.memory_consumption=128" >> $PHP_INI_DIR/conf.d/opcache.ini \
    && echo "opcache.interned_strings_buffer=8" >> $PHP_INI_DIR/conf.d/opcache.ini \
    && echo "opcache.max_accelerated_files=10000" >> $PHP_INI_DIR/conf.d/opcache.ini \
    && echo "opcache.validate_timestamps=0" >> $PHP_INI_DIR/conf.d/opcache.ini

# Set upload limits
RUN echo "upload_max_filesize = 10M" >> $PHP_INI_DIR/conf.d/uploads.ini \
    && echo "post_max_size = 12M" >> $PHP_INI_DIR/conf.d/uploads.ini

# Set correct ownership
RUN chown -R www-data:www-data /var/www/html \
    && chmod -R 755 /var/www/html

# Supervisor config to run both nginx and php-fpm
RUN echo '[supervisord]' > /etc/supervisord.conf \
    && echo 'nodaemon=true' >> /etc/supervisord.conf \
    && echo 'logfile=/dev/stdout' >> /etc/supervisord.conf \
    && echo 'logfile_maxbytes=0' >> /etc/supervisord.conf \
    && echo '' >> /etc/supervisord.conf \
    && echo '[program:nginx]' >> /etc/supervisord.conf \
    && echo 'command=nginx -g "daemon off;"' >> /etc/supervisord.conf \
    && echo 'autostart=true' >> /etc/supervisord.conf \
    && echo 'autorestart=true' >> /etc/supervisord.conf \
    && echo 'stdout_logfile=/dev/stdout' >> /etc/supervisord.conf \
    && echo 'stdout_logfile_maxbytes=0' >> /etc/supervisord.conf \
    && echo 'stderr_logfile=/dev/stderr' >> /etc/supervisord.conf \
    && echo 'stderr_logfile_maxbytes=0' >> /etc/supervisord.conf \
    && echo '' >> /etc/supervisord.conf \
    && echo '[program:php-fpm]' >> /etc/supervisord.conf \
    && echo 'command=php-fpm --nodaemonize' >> /etc/supervisord.conf \
    && echo 'autostart=true' >> /etc/supervisord.conf \
    && echo 'autorestart=true' >> /etc/supervisord.conf \
    && echo 'stdout_logfile=/dev/stdout' >> /etc/supervisord.conf \
    && echo 'stdout_logfile_maxbytes=0' >> /etc/supervisord.conf \
    && echo 'stderr_logfile=/dev/stderr' >> /etc/supervisord.conf \
    && echo 'stderr_logfile_maxbytes=0' >> /etc/supervisord.conf

EXPOSE 8080

ENTRYPOINT ["/entrypoint.sh"]
