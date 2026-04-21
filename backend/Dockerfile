FROM php:8.4-fpm

RUN apt-get update && apt-get install -y \
    git curl zip unzip libpng-dev libonig-dev libxml2-dev \
    && docker-php-ext-install pdo_mysql mbstring exif pcntl bcmath gd

COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

WORKDIR /var/www

COPY . .

RUN composer install --no-dev --optimize-autoloader

RUN echo "memory_limit=512M" > /usr/local/etc/php/conf.d/memory.ini
RUN echo "max_execution_time=120" >> /usr/local/etc/php/conf.d/memory.ini

RUN chown -R www-data:www-data /var/www/storage /var/www/bootstrap/cache

EXPOSE 8000

CMD php artisan config:clear && php artisan migrate --force && php artisan serve --host=0.0.0.0 --port=8000
