#!/bin/sh
set -e

echo "🚀 PRAKTISI-UNMUL Entrypoint Starting..."

# ============================================================
# 1. Initialize storage directories on the Fly Volume
#    (First deploy: volume is empty, we need to create structure)
# ============================================================
echo "📁 Ensuring storage directory structure..."

DIRS="
/var/www/html/storage/app/private/bukti
/var/www/html/storage/app/private/surat
/var/www/html/storage/app/public
/var/www/html/storage/database
/var/www/html/storage/framework/cache/data
/var/www/html/storage/framework/sessions
/var/www/html/storage/framework/views
/var/www/html/storage/logs
"

for dir in $DIRS; do
    mkdir -p "$dir"
done

# ============================================================
# 2. Initialize SQLite database if not exists
# ============================================================
DB_PATH="/var/www/html/storage/database/database.sqlite"

if [ ! -f "$DB_PATH" ]; then
    echo "🗃️  Creating fresh SQLite database..."
    touch "$DB_PATH"
fi

# ============================================================
# 3. Set correct ownership & permissions
# ============================================================
echo "🔐 Setting permissions..."
chown -R www-data:www-data /var/www/html/storage
chmod -R 775 /var/www/html/storage
chmod 664 "$DB_PATH"

# ============================================================
# 4. Create storage symlink
# ============================================================
echo "🔗 Creating storage symlink..."
php /var/www/html/artisan storage:link --force 2>/dev/null || true

# ============================================================
# 5. Run database migrations
# ============================================================
echo "📦 Running migrations..."
php /var/www/html/artisan migrate --force

# ============================================================
# 6. Cache config & routes for production performance
# ============================================================
echo "⚡ Caching config, routes & views..."
php /var/www/html/artisan config:cache
php /var/www/html/artisan route:cache
php /var/www/html/artisan view:cache

# ============================================================
# 7. Start Supervisor (Nginx + PHP-FPM)
# ============================================================
echo "✅ Starting Nginx + PHP-FPM via Supervisor..."
exec /usr/bin/supervisord -c /etc/supervisord.conf
