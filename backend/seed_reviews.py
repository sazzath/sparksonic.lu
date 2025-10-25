#!/usr/bin/env python3
"""
Seed script to populate reviews cache with mock data.
This simulates having all 54 reviews available.
"""
from pymongo import MongoClient
from datetime import datetime, timedelta
import random
import os
from dotenv import load_dotenv

load_dotenv()

# MongoDB Connection
MONGO_URL = os.getenv("MONGO_URL")
client = MongoClient(MONGO_URL)
db = client.get_database()
reviews_cache = db["reviews_cache"]

# Sample review texts
review_texts = [
    "Excellent service! Very professional team. Highly recommend for solar panel installation.",
    "Great experience with the EV charger installation. Quick and efficient work.",
    "Professional electricians, fair pricing, and excellent customer service.",
    "Solar panels installed perfectly. The team was knowledgeable and respectful.",
    "Best electrical service in Luxembourg! Very satisfied with the heat pump installation.",
    "Quick response time and quality work. Will definitely use again.",
    "Fantastic job on our home automation system. Everything works perfectly.",
    "Very impressed with the professionalism and attention to detail.",
    "Fair prices and excellent workmanship. Highly recommended!",
    "The team was punctual, professional, and did an amazing job.",
    "Outstanding service from start to finish. Very happy with the solar installation.",
    "Great communication throughout the project. Exceeded expectations.",
    "Professional team that knows what they're doing. Five stars!",
    "Excellent electrical work. Clean, efficient, and professional.",
    "Highly recommend for any electrical needs. Top-notch service!",
    "Very satisfied with the EV charger installation. Works perfectly.",
    "Professional, courteous, and skilled technicians. Great job!",
    "Best experience we've had with any contractor. Highly professional.",
    "Quality work at reasonable prices. Will use again for sure.",
    "Impressed with the level of expertise and professionalism.",
]

# Sample names
first_names = ["Jean", "Marie", "Michel", "Sophie", "Laurent", "Anne", "Pierre", "Nathalie", "François", "Catherine",
               "Thomas", "Julie", "Nicolas", "Isabelle", "Alexandre", "Patricia", "Olivier", "Christine", "Philippe", "Sylvie",
               "David", "Martine", "Luc", "Monique", "André", "Françoise", "Marc", "Brigitte", "Paul", "Valérie"]

last_names = ["Muller", "Schmidt", "Weber", "Meyer", "Wagner", "Becker", "Schulz", "Hoffmann", "Schmitt", "Koch",
              "Bauer", "Richter", "Klein", "Wolf", "Schroeder", "Neumann", "Schwarz", "Zimmermann", "Braun", "Krüger",
              "Hartmann", "Lange", "Werner", "Schmitz", "Krause", "Meier", "Lehmann", "Huber", "Mayer", "Herrmann"]

# Profile photo URLs (using a placeholder service)
def get_profile_photo():
    gender = random.choice(['men', 'women'])
    number = random.randint(1, 99)
    return f"https://randomuser.me/api/portraits/{gender}/{number}.jpg"

# Generate 54 mock reviews
def generate_reviews(count=54):
    reviews = []
    base_time = datetime.utcnow()
    
    for i in range(count):
        # Generate realistic time spread (reviews over past 2 years)
        days_ago = random.randint(1, 730)
        review_time = base_time - timedelta(days=days_ago)
        
        # Most reviews are 5 stars, some 4 stars
        rating = random.choices([5, 4], weights=[0.85, 0.15])[0]
        
        # Select random text, sometimes combine two
        if random.random() > 0.7:
            text = random.choice(review_texts) + " " + random.choice(review_texts)
        else:
            text = random.choice(review_texts)
        
        review = {
            "author_name": f"{random.choice(first_names)} {random.choice(last_names)}",
            "author_url": f"https://www.google.com/maps/contrib/{random.randint(100000000000000000000, 999999999999999999999)}",
            "language": "en",
            "profile_photo_url": get_profile_photo(),
            "rating": rating,
            "relative_time_description": f"{days_ago // 30} months ago" if days_ago > 60 else f"{days_ago} days ago",
            "text": text,
            "time": int(review_time.timestamp())
        }
        reviews.append(review)
    
    # Sort by time (newest first)
    reviews.sort(key=lambda x: x['time'], reverse=True)
    return reviews

# Seed the database
def seed_reviews():
    print("🌱 Seeding reviews database...")
    
    reviews = generate_reviews(54)
    
    reviews_data = {
        "type": "google_reviews",
        "rating": 5.0,
        "total_reviews": 54,
        "reviews": reviews,
        "updated_at": datetime.utcnow().isoformat()
    }
    
    # Update or insert
    result = reviews_cache.update_one(
        {"type": "google_reviews"},
        {"$set": reviews_data},
        upsert=True
    )
    
    if result.upserted_id:
        print(f"✅ Inserted new reviews cache with {len(reviews)} reviews")
    else:
        print(f"✅ Updated reviews cache with {len(reviews)} reviews")
    
    print(f"📊 Average rating: {reviews_data['rating']}")
    print(f"📝 Total reviews: {reviews_data['total_reviews']}")
    print(f"⭐ 5-star reviews: {sum(1 for r in reviews if r['rating'] == 5)}")
    print(f"⭐ 4-star reviews: {sum(1 for r in reviews if r['rating'] == 4)}")

if __name__ == "__main__":
    seed_reviews()
    print("\n✨ Reviews seeding completed!")
