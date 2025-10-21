# Stage 1: Build React frontend
FROM node:20-alpine AS frontend

WORKDIR /app
COPY frontend/package*.json ./
RUN npm install
COPY frontend/ ./
RUN npm run build

# Stage 2: Laravel backend with Apache
FROM php:8.2-apache

RUN a2enmod rewrite

RUN apt-get update && apt-get install -y \
    unzip curl libpq-dev libzip-dev libonig-dev libcurl4-openssl-dev libssl-dev \
    && docker-php-ext-install pdo pdo_pgsql zip mbstring bcmath opcache

WORKDIR /var/www/html

# Copy Laravel app
COPY backend/ ./

# Composer install
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer
RUN composer install --no-dev --optimize-autoloader

# Copy React build from stage 1
COPY --from=frontend /app/build /var/www/html/public/build

# Set permissions
RUN chown -R www-data:www-data storage bootstrap/cache vendor public/build

EXPOSE 80

CMD ["apache2-foreground"]
