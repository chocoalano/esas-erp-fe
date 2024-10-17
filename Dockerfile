# Menggunakan node image sebagai base
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy package.json dan package-lock.json ke direktori kerja
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy semua file proyek ke dalam container
COPY . .

# Expose port yang digunakan Vue (default 3000)
EXPOSE 3000

# Menjalankan aplikasi Vue
CMD ["npm", "run", "dev", "--", "--host"]
