/**
 * Ecoblock Construction - Project Data
 * Test and reference file for projects listing
 */

const PROJECTS = [
    {
        id: 1,
        title: "Green Valley Housing Project",
        location: "Kumasi, Ghana",
        category: "residential",
        image: "assets/projects-images/ecoblock-ecopanel-2.webp",
        description: "Eco-friendly residential development utilizing EPS foam technology for improved insulation, durability, and cost efficiency.",
        details: {
            client: "Green Valley Development Ltd.",
            year: 2024,
            budget: "GHS 2.5M",
            duration: "8 months",
            team: "45 workers"
        },
        service: "EPS Foam",
        results: {
            energySavings: "35%",
            timeSavings: "25%",
            costSavings: "20%"
        }
    },
    {
        id: 2,
        title: "Premium Column Encasement",
        location: "Takoradi, Ghana",
        category: "infrastructure",
        image: "assets/projects-images/Column-Encasement-1.jpg",
        description: "Elegant architectural column encasement providing both aesthetic appeal and structural support with durable EPS solution.",
        details: {
            client: "Premier Architects Inc.",
            year: 2024,
            budget: "GHS 150K",
            duration: "3 months",
            team: "8 specialists"
        },
        service: "Architectural Shapes & Designs",
        results: {
            qualityScore: "98%",
            clientSatisfaction: "100%",
            projectDelay: "0 days"
        }
    },
    {
        id: 3,
        title: "Decorative Cornices & Trim",
        location: "Tema, Ghana",
        category: "infrastructure",
        image: "assets/projects-images/Cornices.jpg",
        description: "Sophisticated cornice and trim installations adding architectural character and refined elegance to residential and commercial properties.",
        details: {
            client: "Tema Heritage Properties",
            year: 2023,
            budget: "GHS 300K",
            duration: "4 months",
            team: "12 artisans"
        },
        service: "Architectural Shapes & Designs",
        results: {
            craftQuality: "Exceptional",
            clientFeedback: "Outstanding",
            completionRate: "100%"
        }
    },
    {
        id: 4,
        title: "Fanmilk Manufacturing Facility",
        location: "Central Region, Ghana",
        category: "commercial",
        image: "assets/projects-images/Fanmilk.webp",
        description: "State-of-the-art manufacturing facility with climate-controlled EPS insulation systems for optimal product preservation and efficiency.",
        details: {
            client: "Fanmilk Ghana Ltd.",
            year: 2023,
            budget: "GHS 5.8M",
            duration: "14 months",
            team: "120 workers"
        },
        service: "Eco Panel",
        results: {
            thermalEfficiency: "92%",
            operationalCost: "40% reduction",
            completionOnTime: true
        }
    },
    {
        id: 5,
        title: "Lipton Distribution Center",
        location: "Accra, Ghana",
        category: "commercial",
        image: "assets/projects-images/Lipton.webp",
        description: "Modern distribution center featuring advanced EPS insulation for temperature control and warehouse optimization with sustainable design.",
        details: {
            client: "Lipton Ghana Ltd.",
            year: 2023,
            budget: "GHS 4.2M",
            duration: "11 months",
            team: "95 workers"
        },
        service: "Eco Panel",
        results: {
            energyEfficiency: "88%",
            wasteReduction: "78%",
            sustainabilityRating: "Gold"
        }
    },
    {
        id: 6,
        title: "Classical Pediment Design",
        location: "Cape Coast, Ghana",
        category: "infrastructure",
        image: "assets/projects-images/Pediment-1.webp",
        description: "Classical architectural pediment featuring intricate EPS craftsmanship for timeless elegance and superior durability.",
        details: {
            client: "Cape Coast Municipal Authority",
            year: 2024,
            budget: "GHS 200K",
            duration: "2.5 months",
            team: "6 specialists"
        },
        service: "Architectural Shapes & Designs",
        results: {
            designScore: "95/100",
            publicAppreciation: "Very High",
            maintenanceFrequency: "Minimal"
        }
    },
    {
        id: 7,
        title: "Contemporary Wall Treatment",
        location: "Kumasi, Ghana",
        category: "infrastructure",
        image: "assets/projects-images/Wall-Treatment.webp",
        description: "Modern 3D wall treatment installation combining architectural innovation with sustainable EPS materials for stunning interior finishes.",
        details: {
            client: "Kumasi Creative Studios",
            year: 2024,
            budget: "GHS 175K",
            duration: "2 months",
            team: "10 artisans"
        },
        service: "Architectural Shapes & Designs",
        results: {
            designInnovation: "Cutting-edge",
            clientSatisfaction: "100%",
            designAwards: "1 nomination"
        }
    }
];

// Mock API endpoints
const API = {
    // Get all projects
    getAllProjects: function() {
        return PROJECTS;
    },
    
    // Get projects by category
    getProjectsByCategory: function(category) {
        if (category === 'all') {
            return PROJECTS;
        }
        return PROJECTS.filter(project => project.category === category);
    },
    
    // Get project by ID
    getProjectById: function(id) {
        return PROJECTS.find(project => project.id === id);
    },
    
    // Get projects by service type
    getProjectsByService: function(service) {
        return PROJECTS.filter(project => project.service === service);
    },
    
    // Get statistics
    getStatistics: function() {
        return {
            totalProjects: PROJECTS.length,
            totalInvestment: "GHS 13.325M",
            averageCompletionRate: "99%",
            clientSatisfactionRate: "98%"
        };
    },
    
    // Get categories
    getCategories: function() {
        const categories = [...new Set(PROJECTS.map(p => p.category))];
        return [
            { id: 'all', name: 'All Projects' },
            ...categories.map(cat => ({
                id: cat,
                name: cat.charAt(0).toUpperCase() + cat.slice(1)
            }))
        ];
    }
};

// Export for use in other modules if needed
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { PROJECTS, API };
}
