#!/bin/bash
# ========================================================================
# RedKross Academy - Automated PostgreSQL Daily Backup Script
# Retains daily backups for 14 days and automatically cleans up older files.
# ========================================================================

BACKUP_DIR="/var/backups/redkross_postgres"
DATE=$(date +"%Y%m%d_%H%M%S")
DB_NAME="redkross_db"
DB_USER="redkross_admin"
BACKUP_FILE="${BACKUP_DIR}/${DB_NAME}_backup_${DATE}.sql.gz"

mkdir -p "${BACKUP_DIR}"

echo "[$(date)] Initiating backup for database ${DB_NAME}..."

# Export schema and data compressed
pg_dump -U "${DB_USER}" -h 127.0.0.1 "${DB_NAME}" | gzip > "${BACKUP_FILE}"

if [ $? -eq 0 ]; then
  echo "[$(date)] Backup completed successfully: ${BACKUP_FILE}"
else
  echo "[$(date)] ERROR: Backup failed!" >&2
  exit 1
fi

# Clean up backups older than 14 days
echo "[$(date)] Removing backups older than 14 days..."
find "${BACKUP_DIR}" -type f -name "${DB_NAME}_backup_*.sql.gz" -mtime +14 -exec rm {} \;

echo "[$(date)] Backup cycle completed."
