const { useState, useEffect } = React;

// --- MOCK DATA & SCHEMAS ---

const COMPONENT_LIBRARY = [
    {
        id: "hero_modern_01",
        name: "Hero - Modern Video",
        category: "Hero",
        icon: "ri-layout-top-line",
        schema: {
            controls: [
                { key: "headline", label: "Headline", type: "text", defaultValue: "Scale Your Business" },
                { key: "subheadline", label: "Sub-headline", type: "textarea", defaultValue: "The best platform for growth." },
                { key: "bgColor", label: "Section Background", type: "color", defaultValue: "#ffffff" },
                { key: "textColor", label: "Text Color", type: "color", defaultValue: "#1a1a1a" },
                { key: "showButton", label: "Show Button", type: "toggle", defaultValue: true },
                { key: "mediaUrl", label: "Media URL", type: "text", defaultValue: "" }
            ]
        }
    },
    {
        id: "feature_grid_02",
        name: "Feature Grid (3 Col)",
        category: "Features",
        icon: "ri-grid-line",
        schema: {
            controls: [
                { key: "title", label: "Section Title", type: "text", defaultValue: "Our Features" },
                { key: "columns", label: "Columns", type: "number", defaultValue: 3 },
                { key: "bgColor", label: "Section Background", type: "color", defaultValue: "#ffffff" },
                { key: "textColor", label: "Text Color", type: "color", defaultValue: "#1a1a1a" },
                { key: "cardColor", label: "Card Background", type: "color", defaultValue: "#f9fafb" },
                { 
                    key: "features", 
                    label: "Features List", 
                    type: "array", 
                    itemSchema: { title: "text", description: "textarea" },
                    defaultValue: [
                        { title: "Feature 1", description: "Description here." },
                        { title: "Feature 2", description: "Description here." },
                        { title: "Feature 3", description: "Description here." }
                    ]
                }
            ]
        }
    },
    {
        id: "testimonial_slider_01",
        name: "Testimonials",
        category: "Social Proof",
        icon: "ri-chat-quote-line",
        schema: {
            controls: [
                { key: "title", label: "Title", type: "text", defaultValue: "What People Say" },
                { key: "bgColor", label: "Section Background", type: "color", defaultValue: "#ffffff" },
                { key: "textColor", label: "Text Color", type: "color", defaultValue: "#1a1a1a" },
                { 
                    key: "reviews", 
                    label: "Reviews", 
                    type: "array", 
                    itemSchema: { author: "text", text: "textarea" },
                    defaultValue: [{ author: "John Doe", text: "Great product!" }]
                }
            ]
        }
    },
    {
        id: "pricing_card_01",
        name: "Pricing / Variants",
        category: "Sales",
        icon: "ri-price-tag-3-line",
        schema: {
            controls: [
                { key: "title", label: "Title", type: "text", defaultValue: "Choose Your Package" },
                { key: "bgColor", label: "Section Background", type: "color", defaultValue: "#ffffff" },
                { key: "textColor", label: "Text Color", type: "color", defaultValue: "#1a1a1a" },
                { key: "highlightColor", label: "Highlight Color", type: "color", defaultValue: "#3b82f6" },
                { 
                    key: "variants", 
                    label: "Pricing Options", 
                    type: "array", 
                    itemSchema: { label: "text", price: "text" },
                    defaultValue: [{ label: "Basic", price: "$10" }]
                }
            ]
        }
    },
    {
        id: "lead_form_01",
        name: "Lead Form",
        category: "Forms",
        icon: "ri-file-list-3-line",
        schema: {
            controls: [
                { key: "title", label: "Form Title", type: "text", defaultValue: "Contact Us" },
                { key: "bgColor", label: "Section Background", type: "color", defaultValue: "#ffffff" },
                { key: "textColor", label: "Text Color", type: "color", defaultValue: "#1a1a1a" },
                { key: "buttonText", label: "Button Text", type: "text", defaultValue: "Submit" },
                { 
                    key: "fields", 
                    label: "Form Fields", 
                    type: "tags", 
                    defaultValue: ["Name", "Email"]
                }
            ]
        }
    },
    {
        id: "faq_accordion_01",
        name: "FAQ Accordion",
        category: "Content",
        icon: "ri-question-answer-line",
        schema: {
            controls: [
                { key: "title", label: "Title", type: "text", defaultValue: "Frequently Asked Questions" },
                { key: "bgColor", label: "Section Background", type: "color", defaultValue: "#ffffff" },
                { key: "textColor", label: "Text Color", type: "color", defaultValue: "#1a1a1a" },
                { 
                    key: "faqs", 
                    label: "Questions", 
                    type: "array", 
                    itemSchema: { q: "text", a: "textarea" },
                    defaultValue: [{ q: "Question?", a: "Answer." }]
                }
            ]
        }
    },
    {
        id: "cta_simple_01",
        name: "Simple CTA",
        category: "Call to Action",
        icon: "ri-megaphone-line",
        schema: {
            controls: [
                { key: "bgColor", label: "Section Background", type: "color", defaultValue: "#ffffff" },
                { key: "textColor", label: "Text Color", type: "color", defaultValue: "#1a1a1a" },
                { key: "buttonText", label: "Button Text", type: "text", defaultValue: "Get Started" },
                { key: "buttonLink", label: "Link URL", type: "text", defaultValue: "#" },
                { key: "alignment", label: "Alignment", type: "select", options: ["left", "center", "right"], defaultValue: "center" }
            ]
        }
    }
];

const TEMPLATES = [
    {
        id: "auto_care",
        name: "Auto Care Products",
        category: "E-Commerce",
        description: "High-converting product page for car care items.",
        elements: [
            {
                type: "hero_modern_01",
                props: {
                    headline: "Showroom Shine in 10 Minutes",
                    subheadline: "The #1 Nano-Ceramic Coating Spray in Malaysia. Protects against rain, mud, and UV rays.",
                    bgColor: "#1a1a1a",
                    showButton: true,
                    mediaUrl: "https://images.unsplash.com/photo-1601362840469-51e4d8d58785?auto=format&fit=crop&w=800&q=80"
                }
            },
            {
                type: "feature_grid_02",
                props: {
                    title: "Why Choose Nano-Ceramic?",
                    columns: 4,
                    cardColor: "#f8fafc",
                    features: [
                        { title: "Hydrophobic", description: "Repels water and mud instantly." },
                        { title: "UV Protection", description: "Prevents paint fading from sun." },
                        { title: "Mirror Shine", description: "Deep gloss finish for weeks." },
                        { title: "Easy Apply", description: "Just spray and wipe." }
                    ]
                }
            },
            {
                type: "pricing_card_01",
                props: {
                    title: "Choose Your Bundle",
                    variants: [
                        { label: "1 Bottle (Trial)", price: "RM49" },
                        { label: "2 Bottles (Save RM20)", price: "RM79" },
                        { label: "3 Bottles + Free Cloth", price: "RM99" }
                    ]
                }
            },
            {
                type: "testimonial_slider_01",
                props: {
                    title: "Customer Reviews",
                    reviews: [
                        { author: "Jason K.", text: "Water beads off instantly. Best coating I've used." },
                        { author: "Sarah L.", text: "My car looks brand new again!" }
                    ]
                }
            },
            {
                type: "cta_simple_01",
                props: {
                    buttonText: "Shop Now - RM49",
                    buttonLink: "#",
                    alignment: "center"
                }
            }
        ]
    },
    {
        id: "digital_ebook",
        name: "Digital Marketing Ebook",
        category: "Info Product",
        description: "Lead generation and sales page for digital downloads.",
        elements: [
            {
                type: "hero_modern_01",
                props: {
                    headline: "Explode Your Sales on TikTok Shop",
                    subheadline: "The ultimate guide to going viral and selling out inventory in 2024.",
                    bgColor: "#ffffff",
                    showButton: true,
                    mediaUrl: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&w=800&q=80"
                }
            },
            {
                type: "feature_grid_02",
                props: {
                    title: "What You'll Learn",
                    columns: 2,
                    cardColor: "#f0f9ff",
                    features: [
                        { title: "Viral Content Strategy", description: "How to create hooks that stop the scroll." },
                        { title: "Algorithm Hacking", description: "Understand how the FYP works." },
                        { title: "Monetization", description: "Turn views into cash." },
                        { title: "Community Building", description: "Create a loyal fanbase." }
                    ]
                }
            },
            {
                type: "pricing_card_01",
                props: {
                    title: "Get Instant Access",
                    variants: [
                        { label: "Ebook Only", price: "$39" },
                        { label: "Ebook + Video Course", price: "$89" }
                    ]
                }
            },
            {
                type: "faq_accordion_01",
                props: {
                    title: "FAQ",
                    faqs: [
                        { q: "Is this for beginners?", a: "Yes, we start from zero." },
                        { q: "Do I need ad budget?", a: "No, this is organic strategy." }
                    ]
                }
            }
        ]
    },
    {
        id: "dental_implant",
        name: "Dental Implant Pro",
        category: "Service",
        description: "Lead capture for high-ticket dental services.",
        elements: [
            {
                type: "hero_modern_01",
                props: {
                    headline: "Affordable Dental Implants in KL",
                    subheadline: "Restore your smile with our painless, high-tech implant procedure. 0% Installment Plan available.",
                    bgColor: "#f8fafc",
                    showButton: true,
                    mediaUrl: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=800&q=80"
                }
            },
            {
                type: "lead_form_01",
                props: {
                    title: "Claim Your Free Check-up",
                    buttonText: "Book Now",
                    fields: ["Full Name", "Phone Number", "Treatment Interest"]
                }
            },
            {
                type: "testimonial_slider_01",
                props: {
                    title: "Patient Stories",
                    reviews: [
                        { author: "Kamal R.", text: "Dr. Lim is very gentle. I didn't feel a thing." },
                        { author: "Jessica W.", text: "Best dental clinic in Bangsar." }
                    ]
                }
            }
        ]
    },
    {
        id: "home_renovation",
        name: "Home Renovation",
        category: "Service",
        description: "Quote request page for interior design.",
        elements: [
            {
                type: "hero_modern_01",
                props: {
                    headline: "Transform Your Home into a Masterpiece",
                    subheadline: "Interior design and renovation services for condos and landed properties.",
                    bgColor: "#ffffff",
                    showButton: true,
                    mediaUrl: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=800&q=80"
                }
            },
            {
                type: "lead_form_01",
                props: {
                    title: "Request a Quote",
                    buttonText: "Submit Request",
                    fields: ["Property Type", "Area to Renovate", "Budget Estimate"]
                }
            },
            {
                type: "feature_grid_02",
                props: {
                    title: "Our Process",
                    columns: 4,
                    cardColor: "#fff",
                    features: [
                        { title: "Consultation", description: "We meet to discuss your vision." },
                        { title: "Design", description: "3D renderings of your new space." },
                        { title: "Renovation", description: "Our team gets to work." },
                        { title: "Handover", description: "Enjoy your dream home." }
                    ]
                }
            }
        ]
    },
    {
        id: "cooking_class",
        name: "Online Cooking Class",
        category: "Course",
        description: "Video course sales page with variants.",
        elements: [
            {
                type: "hero_modern_01",
                props: {
                    headline: "Cook Authentic Nyonya Food at Home",
                    subheadline: "Video masterclass by Chef Melba. Learn to make Laksa, Kuih, and Pongteh.",
                    bgColor: "#fff7ed",
                    showButton: true,
                    mediaUrl: "https://images.unsplash.com/photo-1556910103-1c02745a30bf?auto=format&fit=crop&w=800&q=80"
                }
            },
            {
                type: "pricing_card_01",
                props: {
                    title: "Choose Your Course",
                    variants: [
                        { label: "Basic Course (5 Recipes)", price: "RM69" },
                        { label: "Masterclass (20 Recipes)", price: "RM129" }
                    ]
                }
            },
            {
                type: "testimonial_slider_01",
                props: {
                    title: "Student Reviews",
                    reviews: [
                        { author: "Sarah J.", text: "My mother-in-law praised my Laksa!" },
                        { author: "Faridah", text: "Videos are very clear and easy to follow." }
                    ]
                }
            }
        ]
    },
    {
        id: "wealth_seminar",
        name: "Wealth Seminar KL",
        category: "Event",
        description: "Event registration page with ticket tiers.",
        elements: [
            {
                type: "hero_modern_01",
                props: {
                    headline: "Master the 2024 Bull Run",
                    subheadline: "Join Malaysia's largest crypto trading workshop. Learn the strategies used by top whales.",
                    bgColor: "#0f172a",
                    showButton: true,
                    mediaUrl: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=800&q=80"
                }
            },
            {
                type: "pricing_card_01",
                props: {
                    title: "Reserve Your Seat",
                    variants: [
                        { label: "General Admission", price: "RM97" },
                        { label: "VIP (Front Row + Dinner)", price: "RM297" }
                    ]
                }
            },
            {
                type: "faq_accordion_01",
                props: {
                    title: "Event Details",
                    faqs: [
                        { q: "Where is the venue?", a: "KLCC Convention Center." },
                        { q: "Is lunch provided?", a: "Yes, buffet lunch is included." }
                    ]
                }
            }
        ]
    }
];

const DEFAULT_FUNNEL_SETTINGS = {
    checkout: {
        title: "Secure Checkout",
        bumpTitle: "Yes! Add Priority Shipping & Insurance",
        bumpDescription: "Get your order faster and fully insured against damage.",
        bumpPrice: 19,
        headerColor: "#f9fafb", // gray-50
        buttonColor: "#2563eb"  // blue-600
    },
    upsell: {
        enabled: true,
        headline: "Wait! Your Order Is Not Complete Yet...",
        offerTitle: "Add This Special Offer?",
        offerDescription: "Get our exclusive VIP Mentorship Access for 50% OFF. This is a one-time offer only available on this page.",
        price: 97,
        originalPrice: 197,
        buttonText: "Yes! Add To My Order",
        declineText: "No thanks, I'll pass on this discount",
        buttonColor: "#16a34a" // green-600
    },
    thankYou: {
        title: "Order Confirmed!",
        message: "Thank you for your purchase. A confirmation email has been sent to you."
    }
};

// --- COMPONENTS ---

const Sidebar = ({ activeTab, setActiveTab }) => {
    const menuItems = [
        { id: 'builder', icon: 'ri-layout-masonry-line', label: 'Builder' },
        { id: 'templates', icon: 'ri-layout-2-line', label: 'Templates' },
        { id: 'funnel', icon: 'ri-filter-3-line', label: 'Funnel' },
        { id: 'payments', icon: 'ri-bank-card-line', label: 'Payments' },
        { id: 'analytics', icon: 'ri-bar-chart-grouped-line', label: 'Analytics' },
        { id: 'inventory', icon: 'ri-store-2-line', label: 'Inventory' },
        { id: 'integrations', icon: 'ri-plug-line', label: 'Integrations' },
        { id: 'settings', icon: 'ri-settings-4-line', label: 'Settings' },
    ];

    return (
        <div className="sidebar-nav">
            <div className="mb-8 text-white text-xl font-black tracking-tighter cursor-default">
                X.IDE
            </div>
            <div className="flex flex-col gap-4 w-full items-center">
                {menuItems.map(item => (
                    <button
                        key={item.id}
                        onClick={() => setActiveTab(item.id)}
                        className={`nav-item ${activeTab === item.id ? 'active' : ''}`}
                    >
                        <i className={`${item.icon} text-xl`}></i>
                        <span className="nav-tooltip">
                            {item.label}
                        </span>
                    </button>
                ))}
            </div>
            <div className="mt-auto">
                <button className="nav-item">
                    <i className="ri-user-line text-xl"></i>
                </button>
            </div>
        </div>
    );
};

const TopBar = ({ activeTab, device, setDevice, onPreview, onPublish }) => {
    return (
        <div className="app-header">
            <div className="header-content">
                <div className="logo-area">
                    <h1 className="font-semibold text-gray-800 capitalize">{activeTab}</h1>
                    {activeTab === 'builder' && (
                        <div className="flex items-center gap-2 text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                            <span className="w-2 h-2 rounded-full bg-green-500"></span>
                            <span>Draft Saved</span>
                        </div>
                    )}
                </div>
                
                {activeTab === 'builder' && (
                    <div className="device-toggle">
                        <button 
                            className={`device-btn ${device === 'desktop' ? 'active' : ''}`}
                            onClick={() => setDevice('desktop')}
                            title="Desktop View"
                        >
                            <i className="ri-macbook-line"></i>
                        </button>
                        <button 
                            className={`device-btn ${device === 'tablet' ? 'active' : ''}`}
                            onClick={() => setDevice('tablet')}
                            title="Tablet View"
                        >
                            <i className="ri-tablet-line"></i>
                        </button>
                        <button 
                            className={`device-btn ${device === 'mobile' ? 'active' : ''}`}
                            onClick={() => setDevice('mobile')}
                            title="Mobile View"
                        >
                            <i className="ri-smartphone-line"></i>
                        </button>
                    </div>
                )}

                <div className="header-actions">
                    {activeTab === 'builder' && (
                        <>
                            <button className="btn-ghost btn-sm" onClick={onPreview}>
                                <i className="ri-eye-line mr-1"></i> Preview
                            </button>
                            <button className="btn-primary btn-sm" onClick={onPublish}>
                                <i className="ri-download-cloud-2-line mr-1"></i> Publish
                            </button>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

// --- BUILDER PANELS ---

const ComponentLibrary = ({ onAddComponent }) => {
    return (
        <div className="panel-left">
            <div className="p-4 border-b border-gray-200">
                <h2 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Components</h2>
                <div className="relative">
                    <i className="ri-search-line absolute left-3 top-2.5 text-gray-400"></i>
                    <input 
                        type="text" 
                        placeholder="Search elements..." 
                        className="form-input pl-9"
                    />
                </div>
            </div>
            <div className="flex-1 overflow-y-auto p-4 space-y-6">
                {['Hero', 'Features', 'Call to Action'].map(category => (
                    <div key={category}>
                        <h3 className="text-xs font-semibold text-gray-500 mb-3">{category}</h3>
                        <div className="grid grid-cols-1 gap-2">
                            {COMPONENT_LIBRARY.filter(c => c.category === category).map(comp => (
                                <div 
                                    key={comp.id}
                                    draggable="true"
                                    onDragStart={(e) => {
                                        e.dataTransfer.setData('componentId', comp.id);
                                        e.dataTransfer.effectAllowed = 'copy';
                                    }}
                                    onClick={() => onAddComponent(comp)}
                                    className="component-card cursor-grab active:cursor-grabbing"
                                >
                                    <div className="component-icon">
                                        <i className={comp.icon}></i>
                                    </div>
                                    <span className="text-sm font-medium text-gray-700">{comp.name}</span>
                                    <i className="ri-add-line ml-auto text-gray-300"></i>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

const PropertiesPanel = ({ selectedElement, onUpdateElement, onDeleteElement }) => {
    if (!selectedElement) {
        return (
            <div className="panel-right items-center justify-center text-center p-6 text-gray-400">
                <i className="ri-cursor-line text-4xl mb-2 opacity-50"></i>
                <p className="text-sm">Select an element on the canvas to edit its properties.</p>
            </div>
        );
    }

    const schema = COMPONENT_LIBRARY.find(c => c.id === selectedElement.type)?.schema || { controls: [] };

    return (
        <div className="panel-right">
            <div className="p-4 border-b border-gray-200 flex items-center justify-between">
                <h2 className="font-semibold text-gray-800">Properties</h2>
                <button 
                    onClick={() => onDeleteElement(selectedElement.id)}
                    className="text-red-500 hover:bg-red-50 p-1.5 rounded transition-colors"
                    title="Delete Element"
                >
                    <i className="ri-delete-bin-line"></i>
                </button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-4 space-y-5">
                {schema.controls.map(control => (
                    <div key={control.key} className="space-y-1.5">
                        <label className="form-label">{control.label}</label>
                        
                        {control.type === 'text' && (
                            <input 
                                type="text" 
                                value={selectedElement.props[control.key] || control.defaultValue}
                                onChange={(e) => onUpdateElement(selectedElement.id, control.key, e.target.value)}
                                className="form-input"
                            />
                        )}
                        
                        {control.type === 'textarea' && (
                            <textarea 
                                value={selectedElement.props[control.key] || control.defaultValue}
                                onChange={(e) => onUpdateElement(selectedElement.id, control.key, e.target.value)}
                                rows="3"
                                className="form-textarea"
                            />
                        )}
                        
                        {control.type === 'color' && (
                            <div className="flex items-center gap-2">
                                <input 
                                    type="color" 
                                    value={selectedElement.props[control.key] || control.defaultValue}
                                    onChange={(e) => onUpdateElement(selectedElement.id, control.key, e.target.value)}
                                    className="w-8 h-8 rounded cursor-pointer border-0 p-0"
                                />
                                <span className="text-sm text-gray-600 font-mono">{selectedElement.props[control.key] || control.defaultValue}</span>
                            </div>
                        )}

                        {control.type === 'toggle' && (
                            <label className="toggle-switch">
                                <input 
                                    type="checkbox" 
                                    checked={selectedElement.props[control.key] !== undefined ? selectedElement.props[control.key] : control.defaultValue}
                                    onChange={(e) => onUpdateElement(selectedElement.id, control.key, e.target.checked)}
                                />
                                <span className="toggle-slider"></span>
                            </label>
                        )}

                        {control.type === 'select' && (
                            <select 
                                value={selectedElement.props[control.key] || control.defaultValue}
                                onChange={(e) => onUpdateElement(selectedElement.id, control.key, e.target.value)}
                                className="form-select"
                            >
                                {control.options.map(opt => (
                                    <option key={opt} value={opt}>{opt}</option>
                                ))}
                            </select>
                        )}
                        
                        {control.type === 'number' && (
                            <input 
                                type="number" 
                                value={selectedElement.props[control.key] || control.defaultValue}
                                onChange={(e) => onUpdateElement(selectedElement.id, control.key, e.target.value)}
                                className="form-input"
                            />
                        )}

                        {control.type === 'tags' && (
                            <div className="space-y-2">
                                <div className="flex flex-wrap gap-2 mb-2">
                                    {(selectedElement.props[control.key] || control.defaultValue || []).map((tag, i) => (
                                        <span key={i} className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded flex items-center gap-1">
                                            {tag}
                                            <button 
                                                onClick={() => {
                                                    const newTags = [...(selectedElement.props[control.key] || control.defaultValue)];
                                                    newTags.splice(i, 1);
                                                    onUpdateElement(selectedElement.id, control.key, newTags);
                                                }}
                                                className="hover:text-blue-900"
                                            >
                                                <i className="ri-close-line"></i>
                                            </button>
                                        </span>
                                    ))}
                                </div>
                                <div className="flex gap-2">
                                    <input 
                                        type="text" 
                                        className="form-input text-sm" 
                                        placeholder="Add new..."
                                        onKeyDown={(e) => {
                                            if (e.key === 'Enter') {
                                                const val = e.target.value.trim();
                                                if (val) {
                                                    const current = selectedElement.props[control.key] || control.defaultValue || [];
                                                    onUpdateElement(selectedElement.id, control.key, [...current, val]);
                                                    e.target.value = '';
                                                }
                                            }
                                        }}
                                    />
                                </div>
                            </div>
                        )}

                        {control.type === 'array' && (
                            <div className="space-y-3 bg-gray-50 p-3 rounded-lg border border-gray-200">
                                {(selectedElement.props[control.key] || control.defaultValue || []).map((item, i) => (
                                    <div key={i} className="bg-white p-3 rounded border border-gray-200 relative group">
                                        <button 
                                            onClick={() => {
                                                const newList = [...(selectedElement.props[control.key] || control.defaultValue)];
                                                newList.splice(i, 1);
                                                onUpdateElement(selectedElement.id, control.key, newList);
                                            }}
                                            className="absolute top-2 right-2 text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                                        >
                                            <i className="ri-delete-bin-line"></i>
                                        </button>
                                        <div className="space-y-2">
                                            {Object.keys(control.itemSchema).map(fieldKey => (
                                                <div key={fieldKey}>
                                                    <label className="text-xs font-bold text-gray-400 uppercase">{fieldKey}</label>
                                                    {control.itemSchema[fieldKey] === 'textarea' ? (
                                                        <textarea
                                                            className="form-textarea text-sm p-1.5"
                                                            rows="2"
                                                            value={item[fieldKey] || ''}
                                                            onChange={(e) => {
                                                                const newList = [...(selectedElement.props[control.key] || control.defaultValue)];
                                                                newList[i] = { ...newList[i], [fieldKey]: e.target.value };
                                                                onUpdateElement(selectedElement.id, control.key, newList);
                                                            }}
                                                        />
                                                    ) : (
                                                        <input
                                                            type="text"
                                                            className="form-input text-sm p-1.5"
                                                            value={item[fieldKey] || ''}
                                                            onChange={(e) => {
                                                                const newList = [...(selectedElement.props[control.key] || control.defaultValue)];
                                                                newList[i] = { ...newList[i], [fieldKey]: e.target.value };
                                                                onUpdateElement(selectedElement.id, control.key, newList);
                                                            }}
                                                        />
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                                <button 
                                    className="btn-secondary btn-sm w-full"
                                    onClick={() => {
                                        const newItem = {};
                                        Object.keys(control.itemSchema).forEach(k => newItem[k] = '');
                                        const current = selectedElement.props[control.key] || control.defaultValue || [];
                                        onUpdateElement(selectedElement.id, control.key, [...current, newItem]);
                                    }}
                                >
                                    <i className="ri-add-line"></i> Add Item
                                </button>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

const ElementRenderer = ({ el, onOpenCheckout, device }) => {
    const isMobile = device === 'mobile';
    const paddingClass = isMobile ? 'p-4' : 'p-8';

    return (
        <div className={paddingClass} style={{ backgroundColor: el.props.bgColor || 'transparent', color: el.props.textColor || 'inherit' }}>
            {el.type === 'hero_modern_01' && (
                <div className="text-center space-y-6">
                    <h1 className={`${isMobile ? 'text-3xl' : 'text-4xl'} font-bold leading-tight`} style={{ color: el.props.textColor || '#111827' }}>{el.props.headline || "Headline"}</h1>
                    <p className={`${isMobile ? 'text-lg' : 'text-xl'} max-w-2xl mx-auto`} style={{ color: el.props.textColor ? `${el.props.textColor}cc` : '#4b5563' }}>{el.props.subheadline || "Subheadline"}</p>
                    
                    {el.props.mediaUrl && (
                        <div className="my-6 rounded-xl overflow-hidden shadow-lg max-w-2xl mx-auto">
                            <img src={el.props.mediaUrl} alt="Hero" className="w-full h-auto object-cover" />
                        </div>
                    )}

                    {(el.props.showButton !== false) && (
                        <button 
                            className="btn-primary text-lg px-8 py-3"
                            onClick={(e) => { e.stopPropagation(); onOpenCheckout({ label: 'Main Offer', price: 49 }); }}
                        >
                            Get Started
                        </button>
                    )}
                </div>
            )}
            
            {el.type === 'feature_grid_02' && (
                <div className="space-y-6">
                    <h2 className="text-2xl font-bold text-center" style={{ color: el.props.textColor || 'inherit' }}>{el.props.title || "Features"}</h2>
                    <div className="responsive-grid" style={{ '--cols': el.props.columns || 3 }}>
                        {(el.props.features || []).length === 0 ? (
                            <div className="text-center text-gray-400 italic p-4 border border-dashed border-gray-300 rounded-lg">No features added yet.</div>
                        ) : (
                            (el.props.features || [
                                { title: "Feature 1", description: "Description here." },
                                { title: "Feature 2", description: "Description here." },
                                { title: "Feature 3", description: "Description here." }
                            ]).slice(0, el.props.columns || 3).map((feature, i) => (
                                <div key={i} className="p-6 rounded-xl border border-gray-100" style={{ backgroundColor: el.props.cardColor || '#f9fafb' }}>
                                    <div className="w-10 h-10 bg-blue-100 rounded-lg mb-4 flex items-center justify-center text-blue-600">
                                        <i className="ri-star-line text-xl"></i>
                                    </div>
                                    <h3 className="font-bold mb-2 text-gray-900">{feature.title}</h3>
                                    <p className="text-sm text-gray-500">{feature.description}</p>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            )}

            {el.type === 'testimonial_slider_01' && (
                <div className="space-y-8">
                    <h2 className="text-2xl font-bold text-center" style={{ color: el.props.textColor || 'inherit' }}>{el.props.title || "What People Say"}</h2>
                    <div className={`grid grid-cols-1 ${isMobile ? '' : 'md:grid-cols-2'} gap-6`}>
                        {(el.props.reviews || []).length === 0 ? (
                            <div className="text-center text-gray-400 italic p-4 border border-dashed border-gray-300 rounded-lg col-span-full">No reviews added yet.</div>
                        ) : (
                            (el.props.reviews || [{author: "John Doe", text: "Great product!"}, {author: "Jane Smith", text: "Loved it."}]).map((review, i) => (
                                <div key={i} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                                    <div className="flex text-yellow-400 mb-3">
                                        <i className="ri-star-fill"></i><i className="ri-star-fill"></i><i className="ri-star-fill"></i><i className="ri-star-fill"></i><i className="ri-star-fill"></i>
                                    </div>
                                    <p className="text-gray-600 italic mb-4">"{review.text}"</p>
                                    <div className="font-bold text-gray-900">- {review.author}</div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            )}

            {el.type === 'pricing_card_01' && (
                <div className="space-y-8">
                    <h2 className="text-2xl font-bold text-center" style={{ color: el.props.textColor || 'inherit' }}>{el.props.title || "Pricing"}</h2>
                    <div className={`grid grid-cols-1 ${device === 'mobile' ? '' : 'md:grid-cols-2 lg:grid-cols-3'} gap-6 justify-center`}>
                        {(el.props.variants || [{label: "Basic", price: "$10"}, {label: "Pro", price: "$20"}]).map((variant, i) => (
                            <div key={i} className="bg-white p-6 rounded-xl border-2 border-gray-100 hover:border-blue-500 transition-colors text-center" style={{ borderColor: el.props.highlightColor ? `${el.props.highlightColor}33` : undefined }}>
                                <h3 className="text-lg font-medium text-gray-500 mb-2">{variant.label}</h3>
                                <div className="text-3xl font-bold text-gray-900 mb-6">{variant.price}</div>
                                <button 
                                    className="btn-secondary w-full"
                                    style={{ borderColor: el.props.highlightColor, color: el.props.highlightColor }}
                                    onClick={(e) => { e.stopPropagation(); onOpenCheckout(variant); }}
                                >
                                    Select
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {el.type === 'lead_form_01' && (
                <div className="max-w-md mx-auto bg-white p-8 rounded-xl shadow-lg border border-gray-100">
                    <h2 className="text-xl font-bold text-center mb-6 text-gray-900">{el.props.title || "Contact Us"}</h2>
                    <div className="space-y-4">
                        {(el.props.fields || ["Name", "Email"]).map((field, i) => (
                            <div key={i}>
                                <label className="block text-sm font-medium text-gray-700 mb-1">{field}</label>
                                <input type="text" className="form-input" placeholder={`Enter ${field}`} />
                            </div>
                        ))}
                        <button 
                            className="btn-primary w-full mt-4"
                            onClick={(e) => { e.stopPropagation(); alert('Form submitted! (Demo)'); }}
                        >
                            {el.props.buttonText || "Submit"}
                        </button>
                    </div>
                </div>
            )}

            {el.type === 'faq_accordion_01' && (
                <div className="max-w-2xl mx-auto space-y-6">
                    <h2 className="text-2xl font-bold text-center" style={{ color: el.props.textColor || 'inherit' }}>{el.props.title || "FAQ"}</h2>
                    <div className="space-y-3">
                        {(el.props.faqs || [{q: "Question 1?", a: "Answer 1."}]).map((faq, i) => (
                            <div key={i} className="bg-white border border-gray-200 rounded-lg p-4">
                                <h3 className="font-semibold text-gray-900 mb-2 flex justify-between items-center">
                                    {faq.q}
                                    <i className="ri-arrow-down-s-line text-gray-400"></i>
                                </h3>
                                <p className="text-gray-600 text-sm">{faq.a}</p>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {el.type === 'cta_simple_01' && (
                <div className={`flex w-full ${el.props.alignment === 'center' ? 'justify-center' : el.props.alignment === 'right' ? 'justify-end' : 'justify-start'}`}>
                    <button 
                        className="btn-primary rounded-full px-8 py-4 text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all"
                        onClick={(e) => { e.stopPropagation(); onOpenCheckout({ label: 'Main Offer', price: 49 }); }}
                    >
                        {el.props.buttonText || "Click Me"}
                    </button>
                </div>
            )}
        </div>
    );
};

const PreviewView = ({ elements, funnelSettings, onOpenCheckout }) => {
    return (
        <div className="min-h-screen bg-white">
            {elements.map(el => (
                <ElementRenderer key={el.id} el={el} onOpenCheckout={onOpenCheckout} />
            ))}
        </div>
    );
};

const Canvas = ({ elements, selectedId, onSelect, onUpdateElement, onReorderElements, onInsertComponent, device, onOpenCheckout }) => {
    return (
        <div className="canvas-area preview-viewport" data-device={device} onClick={() => onSelect(null)}>
            <div 
                className="canvas-frame preview-frame"
                onClick={(e) => e.stopPropagation()}
                onDragOver={(e) => {
                    e.preventDefault();
                    e.dataTransfer.dropEffect = 'copy';
                }}
                onDrop={(e) => {
                    e.preventDefault();
                    const componentId = e.dataTransfer.getData('componentId');
                    if (componentId) {
                        const componentDef = COMPONENT_LIBRARY.find(c => c.id === componentId);
                        if (componentDef) {
                            onInsertComponent(componentDef, elements.length);
                        }
                    }
                }}
            >
                {elements.length === 0 && (
                    <div className="h-full flex flex-col items-center justify-center text-gray-300 pointer-events-none p-20">
                        <i className="ri-layout-line text-6xl mb-4"></i>
                        <p className="text-lg font-medium">Drag and drop components here</p>
                    </div>
                )}

                {elements.map((el, index) => {
                    const isSelected = el.id === selectedId;
                    const def = COMPONENT_LIBRARY.find(c => c.id === el.type);
                    
                    return (
                        <div 
                            key={el.id}
                            draggable="true"
                            onDragStart={(e) => {
                                e.dataTransfer.setData('dragIndex', index);
                                e.dataTransfer.effectAllowed = 'move';
                                e.stopPropagation();
                            }}
                            onDragOver={(e) => {
                                e.preventDefault();
                                e.dataTransfer.dropEffect = 'move';
                            }}
                            onDrop={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                const dragIndexStr = e.dataTransfer.getData('dragIndex');
                                const componentId = e.dataTransfer.getData('componentId');
                                
                                if (componentId) {
                                    const componentDef = COMPONENT_LIBRARY.find(c => c.id === componentId);
                                    if (componentDef) {
                                        onInsertComponent(componentDef, index);
                                    }
                                } else if (dragIndexStr) {
                                    const dragIndex = Number(dragIndexStr);
                                    if (dragIndex !== index && !isNaN(dragIndex)) {
                                        onReorderElements(dragIndex, index);
                                    }
                                }
                            }}
                            onClick={(e) => { e.stopPropagation(); onSelect(el.id); }}
                            className={`relative group border-2 border-transparent hover:border-blue-300 transition-all cursor-move ${isSelected ? 'border-blue-600 ring-2 ring-blue-100 z-10' : ''}`}
                        >
                            {/* Selection Label */}
                            {isSelected && (
                                <div className="absolute -top-7 left-0 bg-blue-600 text-white text-xs px-2 py-1 rounded-t font-medium flex items-center gap-2">
                                    <i className="ri-drag-move-2-line"></i> {def?.name}
                                </div>
                            )}

                            {/* Element Renderer */}
                            <ElementRenderer el={el} onOpenCheckout={onOpenCheckout} device={device} />
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

// --- CHECKOUT & FUNNEL MODALS ---

const CheckoutModal = ({ isOpen, onClose, product, onPurchase, settings }) => {
    if (!isOpen || !product) return null;
    
    const [bump, setBump] = useState(false);
    const bumpPrice = settings?.bumpPrice || 19;
    const total = (parseFloat(product.price.toString().replace(/[^0-9.]/g, '')) || 0) + (bump ? bumpPrice : 0);

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg overflow-hidden animate-fade-in">
                <div className="p-4 border-b border-gray-100 flex justify-between items-center" style={{ backgroundColor: settings?.headerColor || '#f9fafb' }}>
                    <h3 className="font-bold text-lg text-gray-800">{settings?.title || "Secure Checkout"}</h3>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600"><i className="ri-close-line text-2xl"></i></button>
                </div>
                <div className="p-6 space-y-6">
                    {/* Order Summary */}
                    <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                        <h4 className="font-bold text-blue-900 mb-2">Order Summary</h4>
                        <div className="flex justify-between text-sm mb-1">
                            <span>{product.label}</span>
                            <span className="font-bold">{product.price}</span>
                        </div>
                        {bump && (
                            <div className="flex justify-between text-sm text-blue-700">
                                <span>+ {settings?.bumpTitle || "Priority Shipping"}</span>
                                <span className="font-bold">+${bumpPrice}</span>
                            </div>
                        )}
                        <div className="border-t border-blue-200 mt-2 pt-2 flex justify-between font-bold text-lg text-blue-900">
                            <span>Total</span>
                            <span>${total.toFixed(2)}</span>
                        </div>
                    </div>

                    {/* Order Bump */}
                    <div className="border-2 border-dashed border-yellow-400 bg-yellow-50 p-4 rounded-lg flex gap-3 items-start cursor-pointer hover:bg-yellow-100 transition-colors" onClick={() => setBump(!bump)}>
                        <input type="checkbox" checked={bump} onChange={() => {}} className="mt-1 w-5 h-5 text-yellow-600 rounded focus:ring-yellow-500" />
                        <div>
                            <span className="font-bold text-gray-900 text-sm">{settings?.bumpTitle || "Yes! Add Priority Shipping"}</span>
                            <p className="text-xs text-gray-600 mt-1">{settings?.bumpDescription || "Get your order faster."}</p>
                        </div>
                    </div>

                    {/* Payment Form (Mock) */}
                    <div className="space-y-3">
                        <label className="form-label">Payment Details</label>
                        <div className="relative">
                            <i className="ri-bank-card-line absolute left-3 top-3 text-gray-400"></i>
                            <input type="text" className="form-input pl-10" placeholder="Card Number" defaultValue="4242 4242 4242 4242" />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <input type="text" className="form-input" placeholder="MM/YY" defaultValue="12/25" />
                            <input type="text" className="form-input" placeholder="CVC" defaultValue="123" />
                        </div>
                    </div>

                    <button 
                        onClick={() => onPurchase({ ...product, total, bump })} 
                        className="btn-primary w-full py-4 text-lg shadow-lg"
                        style={{ backgroundColor: settings?.buttonColor || '#2563eb' }}
                    >
                        Complete Order - ${total.toFixed(2)}
                    </button>
                    
                    <div className="text-center text-xs text-gray-400 flex flex-col items-center justify-center gap-2 mt-4">
                        <div className="flex items-center gap-2">
                            <i className="ri-lock-line"></i> 256-bit SSL Secure Payment
                        </div>
                        <div className="flex items-center gap-1 opacity-75">
                            <span>Powered by</span>
                            <span className="font-bold text-indigo-500 flex items-center gap-1">
                                <i className="ri-secure-payment-fill"></i> LeanX
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const UpsellModal = ({ isOpen, onAccept, onDecline, settings }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl overflow-hidden animate-fade-in text-center">
                <div className="bg-red-600 text-white p-3 font-bold text-sm uppercase tracking-wider">
                    {settings?.headline || "Wait! Your Order Is Not Complete Yet..."}
                </div>
                <div className="p-8 space-y-6">
                    <h2 className="text-3xl font-bold text-gray-900">{settings?.offerTitle || "Add This Special Offer?"}</h2>
                    <p className="text-gray-600 text-lg max-w-lg mx-auto">
                        {settings?.offerDescription || "Get our exclusive VIP Mentorship Access for 50% OFF."}
                    </p>
                    
                    <div className="bg-gray-100 rounded-xl p-6 max-w-sm mx-auto">
                        <div className="aspect-video bg-gray-300 rounded-lg mb-4 flex items-center justify-center text-gray-500">
                            <i className="ri-image-line text-4xl"></i>
                        </div>
                        <div className="flex justify-between items-center mb-2">
                            <span className="text-gray-500 line-through">${(settings?.originalPrice || 197).toFixed(2)}</span>
                            <span className="text-red-600 font-bold text-xl">${(settings?.price || 97).toFixed(2)}</span>
                        </div>
                    </div>

                    <div className="space-y-3">
                        <button 
                            onClick={onAccept} 
                            className="btn-primary w-full max-w-md mx-auto py-4 text-lg shadow-lg"
                            style={{ backgroundColor: settings?.buttonColor || '#16a34a' }}
                        >
                            {settings?.buttonText || "Yes! Add To My Order"}
                        </button>
                        <button onClick={onDecline} className="block w-full text-gray-400 hover:text-gray-600 text-sm underline">
                            {settings?.declineText || "No thanks, I'll pass on this discount"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

const ThankYouModal = ({ isOpen, onClose, order, settings, upsellPrice }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg overflow-hidden animate-fade-in text-center p-8">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 text-green-600">
                    <i className="ri-check-line text-4xl"></i>
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">{settings?.title || "Order Confirmed!"}</h2>
                <p className="text-gray-600 mb-8">{settings?.message || "Thank you for your purchase."}</p>
                
                <div className="bg-gray-50 rounded-lg p-4 text-left mb-8">
                    <h4 className="font-bold text-gray-800 mb-2 border-b border-gray-200 pb-2">Receipt</h4>
                    <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                            <span>Main Item</span>
                            <span className="font-medium">{order?.label}</span>
                        </div>
                        {order?.bump && (
                            <div className="flex justify-between text-green-600">
                                <span>+ Priority Shipping</span>
                                <span>Included</span>
                            </div>
                        )}
                        {order?.upsell && (
                            <div className="flex justify-between text-blue-600">
                                <span>+ Upsell Offer</span>
                                <span>${(upsellPrice || 97).toFixed(2)}</span>
                            </div>
                        )}
                        <div className="border-t border-gray-200 pt-2 mt-2 flex justify-between font-bold text-lg">
                            <span>Total Paid</span>
                            <span>${(order?.total + (order?.upsell ? (upsellPrice || 97) : 0)).toFixed(2)}</span>
                        </div>
                    </div>
                </div>

                <button onClick={onClose} className="btn-secondary w-full">
                    Close Preview
                </button>
            </div>
        </div>
    );
};

// --- OTHER PANELS ---

const AnalyticsPanel = () => (
    <div className="flex-1 bg-gray-50 p-8 overflow-y-auto">
        <div className="max-w-5xl mx-auto space-y-8">
            <div className="grid grid-cols-3 gap-6">
                {['Total Revenue', 'Conversion Rate', 'Avg. Order Value'].map((metric, i) => (
                    <div key={i} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                        <h3 className="text-sm font-medium text-gray-500 mb-2">{metric}</h3>
                        <div className="flex items-end gap-3">
                            <span className="text-3xl font-bold text-gray-900">{['$12,450', '4.2%', '$85.00'][i]}</span>
                            <span className="text-sm text-green-600 font-medium mb-1">
                                <i className="ri-arrow-up-line"></i> {['12%', '0.8%', '5%'][i]}
                            </span>
                        </div>
                    </div>
                ))}
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 h-96 flex items-center justify-center text-gray-400">
                <div className="text-center">
                    <i className="ri-line-chart-line text-5xl mb-4 opacity-50"></i>
                    <p>Sales Trend Chart Placeholder</p>
                </div>
            </div>
        </div>
    </div>
);

const InventoryPanel = () => (
    <div className="flex-1 bg-gray-50 p-8 overflow-y-auto">
        <div className="max-w-5xl mx-auto bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                <h2 className="font-bold text-lg">Product Inventory</h2>
                <button className="btn-primary btn-sm">Add Product</button>
            </div>
            <table className="w-full text-left text-sm">
                <thead className="bg-gray-50 text-gray-500">
                    <tr>
                        <th className="px-6 py-3 font-medium">Product Name</th>
                        <th className="px-6 py-3 font-medium">SKU</th>
                        <th className="px-6 py-3 font-medium">Stock</th>
                        <th className="px-6 py-3 font-medium">Price</th>
                        <th className="px-6 py-3 font-medium">Status</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                    {[1, 2, 3, 4].map(i => (
                        <tr key={i} className="hover:bg-gray-50">
                            <td className="px-6 py-4 font-medium text-gray-900">Premium Widget {i}</td>
                            <td className="px-6 py-4 text-gray-500">WDG-{100+i}</td>
                            <td className="px-6 py-4 text-gray-500">{10 * i} units</td>
                            <td className="px-6 py-4 text-gray-900 font-medium">$49.99</td>
                            <td className="px-6 py-4">
                                <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">Active</span>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </div>
);

const IntegrationsPanel = () => (
    <div className="flex-1 bg-gray-50 p-8 overflow-y-auto">
        <div className="max-w-3xl mx-auto space-y-6">
            <h2 className="text-xl font-bold text-gray-900">Integrations & Pixels</h2>
            
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center text-blue-600 text-2xl">
                        <i className="ri-facebook-circle-fill"></i>
                    </div>
                    <div className="flex-1">
                        <h3 className="font-bold text-gray-900">Meta Pixel (Facebook)</h3>
                        <p className="text-sm text-gray-500 mb-4">Track conversions and optimize ads.</p>
                        <input type="text" placeholder="Pixel ID (e.g., 123456789)" className="form-input mb-2" />
                        <button className="text-sm text-blue-600 font-medium">Connect Account</button>
                    </div>
                    <label className="toggle-switch">
                        <input type="checkbox" />
                        <span className="toggle-slider"></span>
                    </label>
                </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-orange-50 rounded-lg flex items-center justify-center text-orange-600 text-2xl">
                        <i className="ri-google-fill"></i>
                    </div>
                    <div className="flex-1">
                        <h3 className="font-bold text-gray-900">Google Analytics 4</h3>
                        <p className="text-sm text-gray-500 mb-4">Measure traffic and engagement.</p>
                        <input type="text" placeholder="Measurement ID (e.g., G-XXXXXXX)" className="form-input" />
                    </div>
                </div>
            </div>
        </div>
    </div>
);

const TemplateGallery = ({ onSelectTemplate }) => (
    <div className="flex-1 bg-gray-50 p-8 overflow-y-auto">
        <div className="max-w-5xl mx-auto">
            <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900">Choose a Template</h2>
                <p className="text-gray-500">Start with a proven high-converting layout.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {TEMPLATES.map(template => (
                    <div key={template.id} className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-all group">
                        <div className="h-48 bg-gray-100 flex items-center justify-center relative overflow-hidden">
                            <i className="ri-layout-top-line text-4xl text-gray-300"></i>
                            <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                <button 
                                    onClick={() => onSelectTemplate(template)}
                                    className="btn-primary"
                                >
                                    Use Template
                                </button>
                            </div>
                        </div>
                        <div className="p-5">
                            <div className="flex items-center justify-between mb-2">
                                <h3 className="font-bold text-gray-900">{template.name}</h3>
                                <span className="text-xs font-medium px-2 py-1 bg-blue-50 text-blue-600 rounded-full">
                                    {template.category}
                                </span>
                            </div>
                            <p className="text-sm text-gray-500 line-clamp-2">{template.description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </div>
);

const FunnelPanel = ({ settings, onUpdate }) => {
    const updateSection = (section, key, value) => {
        onUpdate({
            ...settings,
            [section]: {
                ...settings[section],
                [key]: value
            }
        });
    };

    return (
        <div className="flex-1 bg-gray-50 p-8 overflow-y-auto">
            <div className="max-w-3xl mx-auto space-y-6">
                <h2 className="text-xl font-bold text-gray-900">Funnel Settings</h2>
                
                {/* Checkout Settings */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 space-y-4">
                    <h3 className="font-bold text-gray-800 border-b border-gray-100 pb-2 flex items-center gap-2">
                        <i className="ri-shopping-cart-line text-blue-600"></i> Checkout Modal
                    </h3>
                    <div>
                        <label className="form-label">Modal Title</label>
                        <input 
                            type="text" 
                            className="form-input" 
                            value={settings.checkout.title}
                            onChange={(e) => updateSection('checkout', 'title', e.target.value)}
                        />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="md:col-span-2">
                            <label className="form-label">Order Bump Title</label>
                            <input 
                                type="text" 
                                className="form-input" 
                                value={settings.checkout.bumpTitle}
                                onChange={(e) => updateSection('checkout', 'bumpTitle', e.target.value)}
                            />
                        </div>
                        <div className="md:col-span-2">
                            <label className="form-label">Order Bump Description</label>
                            <textarea 
                                className="form-textarea" 
                                rows="2"
                                value={settings.checkout.bumpDescription}
                                onChange={(e) => updateSection('checkout', 'bumpDescription', e.target.value)}
                            />
                        </div>
                        <div>
                            <label className="form-label">Bump Price ($)</label>
                            <input 
                                type="number" 
                                className="form-input" 
                                value={settings.checkout.bumpPrice}
                                onChange={(e) => updateSection('checkout', 'bumpPrice', parseFloat(e.target.value))}
                            />
                        </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-100">
                        <div>
                            <label className="form-label">Header Color</label>
                            <div className="flex items-center gap-2">
                                <input 
                                    type="color" 
                                    className="w-8 h-8 rounded cursor-pointer border-0 p-0"
                                    value={settings.checkout.headerColor || "#f9fafb"}
                                    onChange={(e) => updateSection('checkout', 'headerColor', e.target.value)}
                                />
                                <span className="text-xs text-gray-500 font-mono">{settings.checkout.headerColor || "#f9fafb"}</span>
                            </div>
                        </div>
                        <div>
                            <label className="form-label">Button Color</label>
                            <div className="flex items-center gap-2">
                                <input 
                                    type="color" 
                                    className="w-8 h-8 rounded cursor-pointer border-0 p-0"
                                    value={settings.checkout.buttonColor || "#2563eb"}
                                    onChange={(e) => updateSection('checkout', 'buttonColor', e.target.value)}
                                />
                                <span className="text-xs text-gray-500 font-mono">{settings.checkout.buttonColor || "#2563eb"}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Upsell Settings */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 space-y-4">
                    <h3 className="font-bold text-gray-800 border-b border-gray-100 pb-2 flex items-center gap-2">
                        <i className="ri-arrow-up-circle-line text-orange-600"></i> Upsell Modal
                    </h3>
                    <div className="flex items-center gap-2 mb-2">
                        <label className="toggle-switch">
                            <input 
                                type="checkbox" 
                                checked={settings.upsell.enabled}
                                onChange={(e) => updateSection('upsell', 'enabled', e.target.checked)}
                            />
                            <span className="toggle-slider"></span>
                        </label>
                        <span className="text-sm font-medium text-gray-700">Enable Upsell Step</span>
                    </div>

                    {settings.upsell.enabled && (
                        <div className="space-y-4 animate-fade-in">
                            <div>
                                <label className="form-label">Top Headline</label>
                                <input 
                                    type="text" 
                                    className="form-input" 
                                    value={settings.upsell.headline}
                                    onChange={(e) => updateSection('upsell', 'headline', e.target.value)}
                                />
                            </div>
                            <div>
                                <label className="form-label">Offer Title</label>
                                <input 
                                    type="text" 
                                    className="form-input" 
                                    value={settings.upsell.offerTitle}
                                    onChange={(e) => updateSection('upsell', 'offerTitle', e.target.value)}
                                />
                            </div>
                            <div>
                                <label className="form-label">Offer Description</label>
                                <textarea 
                                    className="form-textarea" 
                                    rows="3"
                                    value={settings.upsell.offerDescription}
                                    onChange={(e) => updateSection('upsell', 'offerDescription', e.target.value)}
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="form-label">Offer Price ($)</label>
                                    <input 
                                        type="number" 
                                        className="form-input" 
                                        value={settings.upsell.price}
                                        onChange={(e) => updateSection('upsell', 'price', parseFloat(e.target.value))}
                                    />
                                </div>
                                <div>
                                    <label className="form-label">Original Price ($)</label>
                                    <input 
                                        type="number" 
                                        className="form-input" 
                                        value={settings.upsell.originalPrice}
                                        onChange={(e) => updateSection('upsell', 'originalPrice', parseFloat(e.target.value))}
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="form-label">Accept Button Text</label>
                                <input 
                                    type="text" 
                                    className="form-input" 
                                    value={settings.upsell.buttonText}
                                    onChange={(e) => updateSection('upsell', 'buttonText', e.target.value)}
                                />
                            </div>
                            <div>
                                <label className="form-label">Decline Link Text</label>
                                <input 
                                    type="text" 
                                    className="form-input" 
                                    value={settings.upsell.declineText}
                                    onChange={(e) => updateSection('upsell', 'declineText', e.target.value)}
                                />
                            </div>
                            <div>
                                <label className="form-label">Button Color</label>
                                <div className="flex items-center gap-2">
                                    <input 
                                        type="color" 
                                        className="w-8 h-8 rounded cursor-pointer border-0 p-0"
                                        value={settings.upsell.buttonColor || "#16a34a"}
                                        onChange={(e) => updateSection('upsell', 'buttonColor', e.target.value)}
                                    />
                                    <span className="text-xs text-gray-500 font-mono">{settings.upsell.buttonColor || "#16a34a"}</span>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Thank You Settings */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 space-y-4">
                    <h3 className="font-bold text-gray-800 border-b border-gray-100 pb-2 flex items-center gap-2">
                        <i className="ri-checkbox-circle-line text-green-600"></i> Thank You Modal
                    </h3>
                    <div>
                        <label className="form-label">Success Title</label>
                        <input 
                            type="text" 
                            className="form-input" 
                            value={settings.thankYou.title}
                            onChange={(e) => updateSection('thankYou', 'title', e.target.value)}
                        />
                    </div>
                    <div>
                        <label className="form-label">Success Message</label>
                        <textarea 
                            className="form-textarea" 
                            rows="2"
                            value={settings.thankYou.message}
                            onChange={(e) => updateSection('thankYou', 'message', e.target.value)}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

const PaymentsPanel = () => {
    const [leanxSettings, setLeanxSettings] = useState({
        enabled: true,
        apiKey: '',
        secretKey: '',
        merchantId: '',
        mode: 'test'
    });

    return (
        <div className="flex-1 bg-gray-50 p-8 overflow-y-auto">
            <div className="max-w-3xl mx-auto space-y-6">
                <h2 className="text-xl font-bold text-gray-900">Payment Settings</h2>
                
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                    <div className="flex items-center justify-between mb-6">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-indigo-50 rounded-lg flex items-center justify-center text-indigo-600 text-2xl">
                                <i className="ri-secure-payment-line"></i>
                            </div>
                            <div>
                                <h3 className="font-bold text-gray-900">LeanX Gateway</h3>
                                <p className="text-sm text-gray-500">Secure credit card processing.</p>
                            </div>
                        </div>
                        <label className="toggle-switch">
                            <input 
                                type="checkbox" 
                                checked={leanxSettings.enabled}
                                onChange={(e) => setLeanxSettings({...leanxSettings, enabled: e.target.checked})}
                            />
                            <span className="toggle-slider"></span>
                        </label>
                    </div>

                    {leanxSettings.enabled && (
                        <div className="space-y-4 animate-fade-in border-t border-gray-100 pt-6">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="form-label">Environment</label>
                                    <select 
                                        className="form-select"
                                        value={leanxSettings.mode}
                                        onChange={(e) => setLeanxSettings({...leanxSettings, mode: e.target.value})}
                                    >
                                        <option value="test">Test Mode (Sandbox)</option>
                                        <option value="live">Live Production</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="form-label">Merchant ID</label>
                                    <input 
                                        type="text" 
                                        className="form-input" 
                                        value={leanxSettings.merchantId}
                                        onChange={(e) => setLeanxSettings({...leanxSettings, merchantId: e.target.value})}
                                        placeholder="lx_m_..."
                                    />
                                </div>
                            </div>
                            
                            <div>
                                <label className="form-label">Public API Key</label>
                                <input 
                                    type="text" 
                                    className="form-input font-mono text-sm" 
                                    value={leanxSettings.apiKey}
                                    onChange={(e) => setLeanxSettings({...leanxSettings, apiKey: e.target.value})}
                                    placeholder="lx_pk_..."
                                />
                            </div>

                            <div>
                                <label className="form-label">Secret Key</label>
                                <input 
                                    type="password" 
                                    className="form-input font-mono text-sm" 
                                    value={leanxSettings.secretKey}
                                    onChange={(e) => setLeanxSettings({...leanxSettings, secretKey: e.target.value})}
                                    placeholder="lx_sk_..."
                                />
                            </div>

                            <div className="bg-blue-50 text-blue-800 p-4 rounded-lg text-sm flex gap-3 items-start mt-4">
                                <i className="ri-information-line text-lg mt-0.5"></i>
                                <div>
                                    <strong>Webhook URL:</strong>
                                    <div className="font-mono mt-1 select-all bg-white/50 p-1 rounded">
                                        https://api.yourstore.com/webhooks/leanx
                                    </div>
                                    <p className="mt-1 opacity-80">Add this URL to your LeanX dashboard to receive payment updates.</p>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

const SettingsPanel = () => (
    <div className="flex-1 bg-gray-50 p-8 overflow-y-auto">
        <div className="max-w-3xl mx-auto space-y-6">
            <h2 className="text-xl font-bold text-gray-900">Store Settings</h2>
            
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 space-y-6">
                <div className="space-y-4">
                    <h3 className="font-bold text-gray-800 border-b border-gray-100 pb-2">General Information</h3>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="form-label">Store Name</label>
                            <input type="text" className="form-input" defaultValue="My Awesome Store" />
                        </div>
                        <div>
                            <label className="form-label">Support Email</label>
                            <input type="email" className="form-input" defaultValue="support@example.com" />
                        </div>
                    </div>
                    <div>
                        <label className="form-label">Store Description</label>
                        <textarea className="form-textarea" rows="3" defaultValue="The best place to buy widgets."></textarea>
                    </div>
                </div>

                <div className="space-y-4">
                    <h3 className="font-bold text-gray-800 border-b border-gray-100 pb-2">Currency & Region</h3>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="form-label">Currency</label>
                            <select className="form-select">
                                <option>USD ($)</option>
                                <option>EUR (€)</option>
                                <option>GBP (£)</option>
                            </select>
                        </div>
                        <div>
                            <label className="form-label">Timezone</label>
                            <select className="form-select">
                                <option>UTC</option>
                                <option>EST</option>
                                <option>PST</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
);

// --- MAIN APP ---

const App = () => {
    const [activeTab, setActiveTab] = useState('builder');
    const [device, setDevice] = useState('desktop');
    const [elements, setElements] = useState([]);
    const [selectedId, setSelectedId] = useState(null);
    const [funnelSettings, setFunnelSettings] = useState(DEFAULT_FUNNEL_SETTINGS);
    const [previewMode, setPreviewMode] = useState(false);

    // Funnel State
    const [checkoutOpen, setCheckoutOpen] = useState(false);
    const [upsellOpen, setUpsellOpen] = useState(false);
    const [thankYouOpen, setThankYouOpen] = useState(false);
    const [checkoutProduct, setCheckoutProduct] = useState(null);
    const [finalOrder, setFinalOrder] = useState(null);

    const handleOpenCheckout = (product) => {
        setCheckoutProduct(product);
        setCheckoutOpen(true);
    };

    const handlePurchase = (orderData) => {
        setFinalOrder(orderData);
        setCheckoutOpen(false);
        // Simulate processing delay
        setTimeout(() => {
            if (funnelSettings.upsell.enabled) {
                setUpsellOpen(true);
            } else {
                setThankYouOpen(true);
            }
        }, 500);
    };

    const handleUpsellAccept = () => {
        setFinalOrder(prev => ({ ...prev, upsell: true }));
        setUpsellOpen(false);
        setThankYouOpen(true);
    };

    const handleUpsellDecline = () => {
        setUpsellOpen(false);
        setThankYouOpen(true);
    };

    const handleCloseAll = () => {
        setCheckoutOpen(false);
        setUpsellOpen(false);
        setThankYouOpen(false);
        setCheckoutProduct(null);
        setFinalOrder(null);
    };

    // --- KEYBOARD SHORTCUTS ---
    useEffect(() => {
        const handleKeyDown = (e) => {
            // Ignore if typing in an input
            if (['INPUT', 'TEXTAREA', 'SELECT'].includes(document.activeElement.tagName)) return;
            
            if ((e.key === 'Delete' || e.key === 'Backspace') && selectedId) {
                handleDeleteElement(selectedId);
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [selectedId, elements]);

    const handleReorderElements = (startIndex, endIndex) => {
        const result = Array.from(elements);
        const [removed] = result.splice(startIndex, 1);
        result.splice(endIndex, 0, removed);
        setElements(result);
    };

    const createNewElement = (componentDef) => {
        const newElement = {
            id: `${componentDef.id}_${Date.now()}`,
            type: componentDef.id,
            props: {}
        };
        // Initialize default props
        componentDef.schema.controls.forEach(c => {
            newElement.props[c.key] = c.defaultValue;
        });
        return newElement;
    };

    const handleAddComponent = (componentDef) => {
        const newElement = createNewElement(componentDef);
        setElements([...elements, newElement]);
        setSelectedId(newElement.id);
    };

    const handleInsertComponent = (componentDef, index) => {
        const newElement = createNewElement(componentDef);
        const newElements = [...elements];
        newElements.splice(index, 0, newElement);
        setElements(newElements);
        setSelectedId(newElement.id);
    };

    const handleUpdateElement = (id, key, value) => {
        setElements(elements.map(el => 
            el.id === id ? { ...el, props: { ...el.props, [key]: value } } : el
        ));
    };

    const handleDeleteElement = (id) => {
        setElements(elements.filter(el => el.id !== id));
        if (selectedId === id) setSelectedId(null);
    };

    const handleLoadTemplate = (template) => {
        if (elements.length > 0 && !confirm('Loading a template will replace your current content. Continue?')) {
            return;
        }
        
        const newElements = template.elements.map(el => {
            const componentDef = COMPONENT_LIBRARY.find(c => c.id === el.type);
            const defaultProps = {};
            if (componentDef) {
                componentDef.schema.controls.forEach(c => {
                    defaultProps[c.key] = c.defaultValue;
                });
            }

            return {
                ...el,
                id: `${el.type}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
                props: {
                    ...defaultProps,
                    ...el.props
                }
            };
        });
        
        setElements(newElements);
        setActiveTab('builder');
        if (newElements.length > 0) {
            setSelectedId(newElements[0].id);
        }
    };

    const handlePreview = () => {
        setPreviewMode(true);
    };

    const handlePublish = () => {
        const data = {
            elements,
            funnelSettings,
            publishedAt: new Date().toISOString()
        };
        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `funnel-export-${Date.now()}.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        alert('Project configuration downloaded successfully!');
    };

    const selectedElement = elements.find(el => el.id === selectedId);

    if (previewMode) {
        return (
            <div className="relative h-screen overflow-y-auto bg-white">
                <button 
                    className="fixed top-4 right-4 z-50 btn-secondary shadow-lg bg-white"
                    onClick={() => setPreviewMode(false)}
                >
                    <i className="ri-close-line mr-1"></i> Exit Preview
                </button>
                <PreviewView 
                    elements={elements} 
                    funnelSettings={funnelSettings} 
                    onOpenCheckout={handleOpenCheckout} 
                />
                {/* Render Modals for Preview */}
                <CheckoutModal 
                    isOpen={checkoutOpen} 
                    onClose={handleCloseAll} 
                    product={checkoutProduct} 
                    onPurchase={handlePurchase}
                    settings={funnelSettings.checkout}
                />
                <UpsellModal 
                    isOpen={upsellOpen} 
                    onAccept={handleUpsellAccept} 
                    onDecline={handleUpsellDecline}
                    settings={funnelSettings.upsell}
                />
                <ThankYouModal 
                    isOpen={thankYouOpen} 
                    onClose={handleCloseAll} 
                    order={finalOrder}
                    settings={funnelSettings.thankYou}
                    upsellPrice={funnelSettings.upsell.price}
                />
            </div>
        );
    }

    return (
        <div className="builder-app">
            <div className="flex flex-1 overflow-hidden">
                <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
                
                <div className="flex-1 flex flex-col min-w-0">
                    <TopBar 
                        activeTab={activeTab} 
                        device={device} 
                        setDevice={setDevice} 
                        onPreview={handlePreview}
                        onPublish={handlePublish}
                    />
                    
                    <div className="workspace">
                        {activeTab === 'builder' && (
                            <>
                                <ComponentLibrary onAddComponent={handleAddComponent} />
                                <Canvas 
                                    elements={elements} 
                                    selectedId={selectedId} 
                                    onSelect={setSelectedId}
                                    onUpdateElement={handleUpdateElement}
                                    onReorderElements={handleReorderElements}
                                    onInsertComponent={handleInsertComponent}
                                    device={device}
                                    onOpenCheckout={handleOpenCheckout}
                                />
                                <PropertiesPanel 
                                    selectedElement={selectedElement} 
                                    onUpdateElement={handleUpdateElement}
                                    onDeleteElement={handleDeleteElement}
                                />
                            </>
                        )}

                        {activeTab === 'templates' && <TemplateGallery onSelectTemplate={handleLoadTemplate} />}
                        {activeTab === 'funnel' && <FunnelPanel settings={funnelSettings} onUpdate={setFunnelSettings} />}
                        {activeTab === 'payments' && <PaymentsPanel />}
                        {activeTab === 'analytics' && <AnalyticsPanel />}
                        {activeTab === 'inventory' && <InventoryPanel />}
                        {activeTab === 'integrations' && <IntegrationsPanel />}
                        {activeTab === 'settings' && <SettingsPanel />}
                    </div>
                </div>
            </div>

            {/* Funnel Modals */}
            <CheckoutModal 
                isOpen={checkoutOpen} 
                onClose={handleCloseAll} 
                product={checkoutProduct} 
                onPurchase={handlePurchase}
                settings={funnelSettings.checkout}
            />
            <UpsellModal 
                isOpen={upsellOpen} 
                onAccept={handleUpsellAccept} 
                onDecline={handleUpsellDecline}
                settings={funnelSettings.upsell}
            />
            <ThankYouModal 
                isOpen={thankYouOpen} 
                onClose={handleCloseAll} 
                order={finalOrder}
                settings={funnelSettings.thankYou}
                upsellPrice={funnelSettings.upsell.price}
            />
        </div>
    );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);