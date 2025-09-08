import dotenv from 'dotenv';
import { connectDatabase } from './config/db.js';
import { Item } from './models/Item.js';

dotenv.config();

const products = [
    {
        name: 'Classic White T-Shirt',
        description: '100% cotton, breathable everyday tee',
        price: 499,
        category: 'clothing',
        imageUrl: 'https://picsum.photos/seed/shirt/400/300',
        stock: 100
    },
    {
        name: 'Wireless Headphones',
        description: 'Noise-cancelling over-ear headphones',
        price: 5999,
        category: 'electronics',
        imageUrl: 'https://picsum.photos/seed/headphones/400/300',
        stock: 50
    },
    {
        name: 'Water Bottle 1L',
        description: 'Insulated stainless steel bottle',
        price: 899,
        category: 'home',
        imageUrl: 'https://picsum.photos/seed/bottle/400/300',
        stock: 200
    },
    {
        name: 'Running Shoes',
        description: 'Lightweight with excellent grip',
        price: 3499,
        category: 'footwear',
        imageUrl: 'https://picsum.photos/seed/shoes/400/300',
        stock: 80
    }
];

const run = async () => {
    try {
        await connectDatabase();
        await Item.deleteMany({});
        const inserted = await Item.insertMany(products);
        console.log(`Seeded ${inserted.length} products.`);
        process.exit(0);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

run();


