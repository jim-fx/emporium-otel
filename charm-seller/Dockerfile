FROM php:8.3-apache

ENV DEBIAN_FRONTEND=noninteractive

RUN apt-get update && \
    apt-get install -y --no-install-recommends \
        git \
        unzip \
        libzip-dev \
        libpq-dev \
        libicu-dev \
    && rm -rf /var/lib/apt/lists/*

RUN a2enmod rewrite

RUN docker-php-ext-install \
    intl \
    pdo_pgsql \
    zip \
    opcache

COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

RUN mkdir -p /var/cache && chown www-data:www-data /var/cache
ENV APP_CACHE_DIR=/var/cache

WORKDIR /var/www/html

COPY composer.json composer.lock ./
RUN composer install --no-dev --optimize-autoloader
