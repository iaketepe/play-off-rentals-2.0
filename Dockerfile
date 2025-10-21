FROM php:8.2-apache

# Enable Apache mod_rewrite for Laravel routing
RUN a2enmod rewrite

# Install PHP extensions
RUN apt-get update && apt-get install -y \
    unzip \
    curl \
    libpq-dev \
    libzip-dev \
    libonig-dev \
    libcurl4-openssl-dev \
    libssl-dev \
    npm \
    && docker-php-ext-install pdo pdo_pgsql zip mbstring bcmath opcache

WORKDIR /var/www/html

# Copy the entire Laravel project
COPY . .

# Install Composer dependencies
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer
RUN composer install --no-dev --optimize-autoloader

# Install Node dependencies and build React/Vite assets
RUN npm install
RUN npm run build

# Set permissions
RUN chown -R www-data:www-data storage bootstrap/cache vendor public/build

EXPOSE 80

CMD ["apache2-foreground"]
