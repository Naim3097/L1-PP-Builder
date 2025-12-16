import json
import os
import re

# ------------------------------------------------------------------
# CONFIGURATION
# ------------------------------------------------------------------

OUTPUT_DIR = "../samples"
LAYOUTS_DIR = "layouts"

# ------------------------------------------------------------------
# DATA: 10 MALAYSIAN NICHES
# ------------------------------------------------------------------

INDUSTRIES = [
    {
        "key": "auto_inspection_puspakom",
        "name": "MyCar Inspect Pro",
        "type": "leadgen",
        "theme": {
            "primary": "#0056b3",
            "bg": "#f0f4f8",
            "text": "#333333",
            "light_bg": "#ffffff",
            "font_heading": "Roboto, sans-serif",
            "font_body": "Open Sans, sans-serif",
            "google_fonts": "Roboto:700|Open+Sans:400,600",
            "radius": "8px"
        },
        "data": {
            "hero": {
                "headline": "Hassle-Free Puspakom Inspection Service",
                "subheadline": "We pick up your car, handle the inspection, and return it to your doorstep. Save time and avoid the queue!",
                "cta_text": "Book Inspection Now",
                "media_type": "image",
                "media_url": "https://images.unsplash.com/photo-1489824904134-891ab64532f1?auto=format&fit=crop&w=800&q=80"
            },
            "form": {
                "title": "Schedule Your Inspection",
                "fields": [
                    {"type": "text", "label": "Car Model & Year", "placeholder": "e.g. Myvi 2018"},
                    {"type": "select", "label": "Service Type", "options": ["B5 Transfer Ownership", "Road Tax Renewal", "E-Hailing Inspection"]},
                    {"type": "date", "label": "Preferred Date"}
                ],
                "cta": "Get Quote & Book"
            },
            "reviews": [
                {"author": "Ahmad Z.", "text": "Saved me 4 hours of waiting at Puspakom. Worth every ringgit!"},
                {"author": "Sarah L.", "text": "Very professional runner. My car was returned safely."}
            ],
            "faq": [
                {"q": "Is my car insured during the process?", "a": "Yes, our runners are covered by comprehensive liability insurance."},
                {"q": "How long does it take?", "a": "Usually 3-4 hours depending on the queue at the center."}
            ]
        }
    },
    {
        "key": "auto_care_products",
        "name": "KilatKing Car Care",
        "type": "ecom",
        "theme": {
            "primary": "#d32f2f",
            "bg": "#1a1a1a",
            "text": "#f0f0f0",
            "light_bg": "#2d2d2d",
            "font_heading": "Montserrat, sans-serif",
            "font_body": "Lato, sans-serif",
            "google_fonts": "Montserrat:800|Lato:400",
            "radius": "4px",
            "shadow": "0 4px 20px rgba(0,0,0,0.5)"
        },
        "data": {
            "hero": {
                "headline": "Showroom Shine in 10 Minutes",
                "subheadline": "The #1 Nano-Ceramic Coating Spray in Malaysia. Protects against rain, mud, and UV rays.",
                "cta_text": "Shop Now",
                "media_type": "image",
                "media_url": "https://images.unsplash.com/photo-1601362840469-51e4d8d58785?auto=format&fit=crop&w=800&q=80"
            },
            "variants": [
                {"id": "single", "label": "1 Bottle (Trial)", "price": 49.00},
                {"id": "double", "label": "2 Bottles (Save RM20)", "price": 79.00},
                {"id": "family", "label": "3 Bottles + Free Cloth", "price": 99.00}
            ],
            "products": {
                "bump": {"id": "sponge", "label": "Premium Applicator Sponge", "price": 9.90},
                "upsell": {"id": "tire_shine", "label": "Add Tire Shine Gel?", "price": 29.00}
            },
            "upsell_page": {
                "headline": "Wait! Don't Forget Your Tires",
                "subheadline": "Get our long-lasting Tire Shine Gel for 50% OFF. One time offer.",
                "image_url": "https://images.unsplash.com/photo-1552934215-1a96e8195326?auto=format&fit=crop&w=400&q=80",
                "cta_yes": "Yes, Add to Order - RM29",
                "cta_no": "No thanks, I'll skip this"
            },
            "reviews": [
                {"author": "Jason K.", "text": "Water beads off instantly. Best coating I've used."},
                {"author": "Siti M.", "text": "My old Saga looks brand new again!"}
            ],
            "faq": [
                {"q": "How long does one bottle last?", "a": "One bottle can coat a sedan 3-4 times."},
                {"q": "Is it safe for glass?", "a": "Yes, it works great on windshields as a rain repellent."}
            ]
        }
    },
    {
        "key": "auto_service_center",
        "name": "ProMechanic KL",
        "type": "leadgen",
        "theme": {
            "primary": "#ff6b00",
            "bg": "#ffffff",
            "text": "#222",
            "light_bg": "#f4f4f4",
            "font_heading": "Oswald, sans-serif",
            "font_body": "Roboto, sans-serif",
            "google_fonts": "Oswald:700|Roboto:400",
            "radius": "0px"
        },
        "data": {
            "hero": {
                "headline": "Expert Car Service & Repair in Klang Valley",
                "subheadline": "From oil changes to engine overhauls. Honest pricing, genuine parts.",
                "cta_text": "Book Appointment",
                "media_type": "image",
                "media_url": "https://images.unsplash.com/photo-1530046339160-711533799eb7?auto=format&fit=crop&w=800&q=80"
            },
            "form": {
                "title": "Book Your Slot",
                "fields": [
                    {"type": "text", "label": "Vehicle Model"},
                    {"type": "select", "label": "Service Needed", "options": ["Minor Service (Oil/Filter)", "Major Service", "Aircond Service", "Brake Inspection"]},
                    {"type": "text", "label": "Phone Number"}
                ],
                "cta": "Confirm Booking"
            },
            "reviews": [
                {"author": "David T.", "text": "They diagnosed the noise that 3 other shops couldn't find."},
                {"author": "Mei Ling", "text": "Clean workshop and transparent pricing."}
            ],
            "faq": [
                {"q": "Do you provide warranty?", "a": "Yes, 6 months warranty on all parts and labor."},
                {"q": "Are you open on Sundays?", "a": "We are open Mon-Sat, 9am to 6pm."}
            ]
        }
    },
    {
        "key": "dental_implant_pro",
        "name": "SmileBright Dental",
        "type": "leadgen",
        "theme": {
            "primary": "#00bfa5",
            "bg": "#f0fffc",
            "text": "#444",
            "light_bg": "#ffffff",
            "font_heading": "Poppins, sans-serif",
            "font_body": "Open Sans, sans-serif",
            "google_fonts": "Poppins:600|Open+Sans:400",
            "radius": "12px"
        },
        "data": {
            "hero": {
                "headline": "Affordable Dental Implants in KL",
                "subheadline": "Restore your smile with our painless, high-tech implant procedure. 0% Installment Plan available.",
                "cta_text": "Free Consultation",
                "media_type": "image",
                "media_url": "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=800&q=80"
            },
            "form": {
                "title": "Claim Your Free Check-up",
                "fields": [
                    {"type": "text", "label": "Full Name"},
                    {"type": "text", "label": "Phone Number"},
                    {"type": "select", "label": "Treatment Interest", "options": ["Implants", "Braces", "Veneers", "General Checkup"]}
                ],
                "cta": "Book Now"
            },
            "reviews": [
                {"author": "Kamal R.", "text": "Dr. Lim is very gentle. I didn't feel a thing during the implant surgery."},
                {"author": "Jessica W.", "text": "Best dental clinic in Bangsar. Highly recommended."}
            ],
            "faq": [
                {"q": "Is it painful?", "a": "We use local anesthesia, so the procedure is virtually painless."},
                {"q": "Can I pay by installment?", "a": "Yes, we accept Maybank and Public Bank 0% installment plans."}
            ]
        }
    },
    {
        "key": "insurance_life_secure",
        "name": "SecureLife Malaysia",
        "type": "leadgen",
        "theme": {
            "primary": "#2e7d32",
            "bg": "#ffffff",
            "text": "#2c3e50",
            "light_bg": "#e8f5e9",
            "font_heading": "Merriweather, serif",
            "font_body": "Lato, sans-serif",
            "google_fonts": "Merriweather:700|Lato:400",
            "radius": "6px"
        },
        "data": {
            "hero": {
                "headline": "Protect Your Family's Future Today",
                "subheadline": "Get RM500,000 coverage starting from just RM80/month. Medical card included.",
                "cta_text": "Get Free Quote",
                "media_type": "image",
                "media_url": "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&q=80"
            },
            "form": {
                "title": "Get Your Personalized Quote",
                "fields": [
                    {"type": "text", "label": "Name"},
                    {"type": "number", "label": "Age"},
                    {"type": "select", "label": "Smoking Status", "options": ["Non-Smoker", "Smoker"]},
                    {"type": "text", "label": "Phone Number"}
                ],
                "cta": "Calculate Premium"
            },
            "reviews": [
                {"author": "Razak M.", "text": "Claim process was fast and easy when I was hospitalized."},
                {"author": "Tan S.Y.", "text": "Agent explained everything clearly. No hidden clauses."}
            ],
            "faq": [
                {"q": "Is there a waiting period?", "a": "Yes, standard 30-day waiting period for medical claims."},
                {"q": "Which hospitals are covered?", "a": "We cover over 150 panel hospitals across Malaysia."}
            ]
        }
    },
    {
        "key": "wealth_seminar_kl",
        "name": "Crypto Wealth Summit",
        "type": "vsl",
        "theme": {
            "primary": "#fbc02d",
            "bg": "#121212",
            "text": "#e0e0e0",
            "light_bg": "#1e1e1e",
            "font_heading": "Montserrat, sans-serif",
            "font_body": "Roboto, sans-serif",
            "google_fonts": "Montserrat:900|Roboto:300",
            "radius": "0px"
        },
        "data": {
            "hero": {
                "headline": "Master the 2024 Bull Run",
                "subheadline": "Join Malaysia's largest crypto trading workshop. Learn the strategies used by top whales.",
                "cta_text": "Reserve Your Seat",
                "media_type": "video",
                "media_url": "https://www.youtube.com/embed/dQw4w9WgXcQ" 
            },
            "variants": [
                {"id": "general", "label": "General Admission", "price": 97.00},
                {"id": "vip", "label": "VIP (Front Row + Dinner)", "price": 297.00}
            ],
            "products": {
                "bump": {"id": "recording", "label": "Add Event Recordings", "price": 47.00},
                "upsell": {"id": "mentorship", "label": "Join Inner Circle Mentorship?", "price": 997.00}
            },
            "upsell_page": {
                "headline": "Wait! One Last Thing...",
                "subheadline": "Get direct access to our mentors for 30 days.",
                "image_url": "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=400&q=80",
                "cta_yes": "Yes, Upgrade to Inner Circle",
                "cta_no": "No thanks"
            },
            "reviews": [
                {"author": "Ali H.", "text": "I made back the ticket price in my first trade."},
                {"author": "Ken L.", "text": "Eye-opening strategies. Not the usual basic stuff."}
            ],
            "faq": [
                {"q": "Is this suitable for beginners?", "a": "Yes, we start from the basics on Day 1."},
                {"q": "Where is the venue?", "a": "Connexion Conference & Event Centre, Bangsar South."}
            ]
        }
    },
    {
        "key": "online_cooking_class",
        "name": "Nyonya Kitchen Secrets",
        "type": "vsl",
        "theme": {
            "primary": "#d84315",
            "bg": "#fff3e0",
            "text": "#4e342e",
            "light_bg": "#ffffff",
            "font_heading": "Playfair Display, serif",
            "font_body": "Lato, sans-serif",
            "google_fonts": "Playfair+Display:700|Lato:400",
            "radius": "10px"
        },
        "data": {
            "hero": {
                "headline": "Cook Authentic Nyonya Food at Home",
                "subheadline": "Video masterclass by Chef Melba. Learn to make Laksa, Kuih, and Pongteh.",
                "cta_text": "Start Learning",
                "media_type": "video",
                "media_url": "https://www.youtube.com/embed/dQw4w9WgXcQ"
            },
            "variants": [
                {"id": "basic", "label": "Basic Course (5 Recipes)", "price": 69.00},
                {"id": "master", "label": "Masterclass (20 Recipes + Ebook)", "price": 129.00}
            ],
            "products": {
                "bump": {"id": "spice_kit", "label": "Add Starter Spice Kit (Shipped)", "price": 35.00},
                "upsell": {"id": "live_session", "label": "Live Zoom Q&A Session?", "price": 50.00}
            },
            "upsell_page": {
                "headline": "Cook With Chef Melba Live!",
                "subheadline": "Join our monthly Zoom session to ask questions and cook along.",
                "image_url": "https://images.unsplash.com/photo-1556910103-1c02745a30bf?auto=format&fit=crop&w=400&q=80",
                "cta_yes": "Yes, Add Live Session",
                "cta_no": "No thanks"
            },
            "reviews": [
                {"author": "Sarah J.", "text": "My mother-in-law praised my Laksa! Thank you Chef."},
                {"author": "Faridah", "text": "Videos are very clear and easy to follow."}
            ],
            "faq": [
                {"q": "Do I get lifetime access?", "a": "Yes, pay once and watch forever."},
                {"q": "Are ingredients hard to find?", "a": "Most can be found at local wet markets or supermarkets."}
            ]
        }
    },
    {
        "key": "digital_marketing_ebook",
        "name": "TikTok Shop Mastery",
        "type": "vsl",
        "theme": {
            "primary": "#000000",
            "bg": "#ffffff",
            "text": "#333",
            "light_bg": "#f0f0f0",
            "font_heading": "Inter, sans-serif",
            "font_body": "Inter, sans-serif",
            "google_fonts": "Inter:400,700,900",
            "radius": "8px"
        },
        "data": {
            "hero": {
                "headline": "Explode Your Sales on TikTok Shop",
                "subheadline": "The ultimate guide to going viral and selling out inventory in 2024.",
                "cta_text": "Download Ebook",
                "media_type": "image",
                "media_url": "https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&w=800&q=80"
            },
            "variants": [
                {"id": "ebook", "label": "Ebook Only", "price": 39.00},
                {"id": "bundle", "label": "Ebook + Video Course", "price": 89.00}
            ],
            "products": {
                "bump": {"id": "templates", "label": "Add Viral Video Templates", "price": 19.00},
                "upsell": {"id": "coaching", "label": "1-on-1 Audit Call?", "price": 199.00}
            },
            "upsell_page": {
                "headline": "Need Personal Help?",
                "subheadline": "Let me audit your TikTok account and give you a custom strategy.",
                "image_url": "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=400&q=80",
                "cta_yes": "Yes, Book Audit Call",
                "cta_no": "No thanks"
            },
            "reviews": [
                {"author": "Hafiz", "text": "Went from 0 to RM10k sales in my first month."},
                {"author": "Elaine", "text": "The templates alone are worth the price."}
            ],
            "faq": [
                {"q": "Is this for beginners?", "a": "Yes, we cover account setup to advanced ads."},
                {"q": "Format?", "a": "PDF download sent instantly to email."}
            ]
        }
    },
    {
        "key": "used_car_sales",
        "name": "Trusted Motors KL",
        "type": "leadgen",
        "theme": {
            "primary": "#c62828",
            "bg": "#f5f5f5",
            "text": "#212121",
            "light_bg": "#ffffff",
            "font_heading": "Roboto Condensed, sans-serif",
            "font_body": "Roboto, sans-serif",
            "google_fonts": "Roboto+Condensed:700|Roboto:400",
            "radius": "4px"
        },
        "data": {
            "hero": {
                "headline": "Quality Used Cars. No Hidden Fees.",
                "subheadline": "175-point inspection on every car. 1-year warranty included.",
                "cta_text": "View Inventory",
                "media_type": "image",
                "media_url": "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=800&q=80"
            },
            "form": {
                "title": "Find Your Dream Car",
                "fields": [
                    {"type": "select", "label": "Budget", "options": ["Below RM30k", "RM30k - RM60k", "RM60k - RM100k", "Above RM100k"]},
                    {"type": "select", "label": "Type", "options": ["Sedan", "SUV", "MPV", "Hatchback"]},
                    {"type": "text", "label": "Phone Number"}
                ],
                "cta": "Get Car List"
            },
            "reviews": [
                {"author": "Muthu", "text": "Bought a Honda City here. Condition is like new."},
                {"author": "Chong", "text": "Salesman was very helpful, loan approved in 2 days."}
            ],
            "faq": [
                {"q": "Do you accept trade-ins?", "a": "Yes, we offer high trade-in value."},
                {"q": "Can I test drive?", "a": "Yes, visit our showroom in Cheras for a test drive."}
            ]
        }
    },
    {
        "key": "home_renovation",
        "name": "RenoMaster Malaysia",
        "type": "leadgen",
        "theme": {
            "primary": "#5d4037",
            "bg": "#efebe9",
            "text": "#3e2723",
            "light_bg": "#ffffff",
            "font_heading": "Playfair Display, serif",
            "font_body": "Open Sans, sans-serif",
            "google_fonts": "Playfair+Display:700|Open+Sans:400",
            "radius": "0px"
        },
        "data": {
            "hero": {
                "headline": "Transform Your Home into a Masterpiece",
                "subheadline": "Interior design and renovation services for condos and landed properties.",
                "cta_text": "Get Free Quotation",
                "media_type": "image",
                "media_url": "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=800&q=80"
            },
            "form": {
                "title": "Request a Quote",
                "fields": [
                    {"type": "select", "label": "Property Type", "options": ["Condominium", "Terrace", "Semi-D/Bungalow"]},
                    {"type": "select", "label": "Area to Renovate", "options": ["Kitchen", "Living Room", "Full House", "Bedroom"]},
                    {"type": "text", "label": "Budget Estimate"}
                ],
                "cta": "Submit Request"
            },
            "reviews": [
                {"author": "Puan Zaiton", "text": "They finished my kitchen cabinet on time and within budget."},
                {"author": "Gary L.", "text": "Workmanship is excellent. Highly recommended."}
            ],
            "faq": [
                {"q": "Do you provide 3D drawings?", "a": "Yes, we provide 3D visualization before starting work."},
                {"q": "Is there a warranty?", "a": "We provide 12 months warranty on workmanship."}
            ]
        }
    }
]

# ------------------------------------------------------------------
# GENERATOR LOGIC
# ------------------------------------------------------------------

def generate_site(industry):
    print(f"Generating {industry['key']} ({industry['type']})...")
    
    # Select Layout
    layout_file = f"layout_{industry['type']}.html"
    layout_path = os.path.join(LAYOUTS_DIR, layout_file)
    
    if not os.path.exists(layout_path):
        print(f"Error: Layout {layout_file} not found!")
        return

    with open(layout_path, "r", encoding="utf-8") as f:
        html = f.read()

    # Inject Data
    # We inject the entire industry object into window.FUNNEL_DATA
    # Merging theme and data for easier access in JS
    
    funnel_data = industry['data'].copy()
    funnel_data['theme'] = industry['theme']
    
    # Serialize to JSON
    json_data = json.dumps(funnel_data, indent=4)
    
    # Replace Placeholder
    # We look for window.FUNNEL_DATA = {}; and replace it
    # Or we can just inject it at the top of the script
    
    # Robust replacement:
    pattern = r"window\.FUNNEL_DATA\s*=\s*\{.*?\};"
    replacement = f"window.FUNNEL_DATA = {json_data};"
    
    # If the pattern matches, replace it. If not (e.g. multiline), we might need a simpler injection.
    # Since our layouts have `window.FUNNEL_DATA = {};` explicitly, we can just replace that string.
    
    if "window.FUNNEL_DATA = {};" in html:
        html = html.replace("window.FUNNEL_DATA = {};", replacement)
    else:
        # Fallback regex if formatting changed
        html = re.sub(pattern, replacement, html, flags=re.DOTALL)

    # Save Output
    output_filename = f"{industry['key']}.html"
    output_path = os.path.join(OUTPUT_DIR, output_filename)
    
    # Ensure output dir exists
    os.makedirs(OUTPUT_DIR, exist_ok=True)
    
    with open(output_path, "w", encoding="utf-8") as f:
        f.write(html)
        
    # Also save the JSON data separately for reference
    json_filename = f"{industry['key']}.json"
    json_path = os.path.join(OUTPUT_DIR, json_filename)
    with open(json_path, "w", encoding="utf-8") as f:
        f.write(json_data)

    print(f"Saved to {output_path}")

def main():
    print("Starting Generator...")
    for ind in INDUSTRIES:
        generate_site(ind)
    print("Done!")

if __name__ == "__main__":
    main()
