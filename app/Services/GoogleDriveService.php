<?php

namespace App\Services;

use Illuminate\Support\Facades\Log;

class GoogleDriveService
{
    /**
     * Archive approved permission letters to Google Drive.
     * Fail-safe design: if not configured, simply logs warning and does not crash app.
     */
    public function archiveToDrive($localFilePath, $fileName)
    {
        try {
            // Cek apakah kredensial Google Drive disiapkan di konfigurasi / env
            $clientJson = config('services.google_drive.service_account_json');
            $folderId = config('services.google_drive.folder_id');

            if (empty($clientJson) || empty($folderId)) {
                Log::info("Google Drive archiving skipped: GOOGLE_DRIVE_SERVICE_ACCOUNT_JSON or GOOGLE_DRIVE_FOLDER_ID not set in env.");
                return false;
            }

            // Jika service account JSON diset sebagai path file atau content string
            if (!file_exists($clientJson) && !json_decode($clientJson)) {
                Log::warning("Google Drive archiving skipped: Invalid service account JSON path or content.");
                return false;
            }

            // Inisialisasi Google API Client jika package google/apiclient terinstall
            if (!class_exists('\Google\Client')) {
                Log::warning("Google Drive archiving skipped: Google API Client library (google/apiclient) is not installed.");
                return false;
            }

            $client = new \Google\Client();
            if (file_exists($clientJson)) {
                $client->setAuthConfig($clientJson);
            } else {
                $client->setAuthConfig(json_decode($clientJson, true));
            }

            $client->addScope(\Google\Service\Drive::DRIVE_FILE);
            $service = new \Google\Service\Drive($client);

            $fileMetadata = new \Google\Service\Drive\DriveFile([
                'name' => $fileName,
                'parents' => [$folderId]
            ]);

            $content = \Illuminate\Support\Facades\Storage::disk('local')->get($localFilePath);

            $file = $service->files->create($fileMetadata, [
                'data' => $content,
                'mimeType' => 'application/pdf',
                'uploadType' => 'multipart',
                'fields' => 'id'
            ]);

            Log::info("Successfully archived letter to Google Drive. File ID: " . $file->id);
            return $file->id;
        } catch (\Exception $e) {
            Log::error("Failed archiving to Google Drive: " . $e->getMessage());
            return false;
        }
    }
}
