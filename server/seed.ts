import { db } from "./db";
import { merchants } from "@shared/schema";

async function seedDatabase() {
  try {
    console.log("Seeding database...");
    
    // Seed merchants
    await db.insert(merchants).values([
      {
        name: "Tech Store",
        category: "Electronics",
        image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=150&h=150&fit=crop",
        address: "Connaught Place, Delhi",
        verified: true,
        supportsOffline: true,
      },
      {
        name: "Coffee Beans Cafe",
        category: "Food & Beverage", 
        image: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=150&h=150&fit=crop",
        address: "Khan Market, Delhi",
        verified: true,
        supportsOffline: true,
      },
      {
        name: "Sharma General Store",
        category: "Grocery",
        address: "Local Market, Delhi",
        verified: true,
        supportsOffline: true,
      },
    ]).onConflictDoNothing();
    
    console.log("Database seeded successfully!");
  } catch (error) {
    console.error("Error seeding database:", error);
  }
}

seedDatabase();