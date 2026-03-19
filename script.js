/**
 * FILMDOM - Premium Logic Engine
 * 50 Movies | Search | YouTube Trailers | Sign-In & Sign-Up
 */

// 1. MOVIE DATABASE (50 Movies)
const movieTitles = [
    "Oppenheimer", "Inception", "Interstellar", "The Dark Knight", "Dune: Part Two", 
    "Parasite", "The Matrix", "Joker", "Gladiator", "Avengers: Endgame",
    "The Godfather", "Pulp Fiction", "Forrest Gump", "The Lion King", "Spider-Man: No Way Home", 
    "The Prestige", "The Departed", "Whiplash", "Django Unchained", "The Wolf of Wall Street",
    "Shutter Island", "Mad Max: Fury Road", "Arrival", "Blade Runner 2049", "The Revenant", 
    "Dunkirk", "Avatar", "Titanic", "Top Gun: Maverick", "The Shawshank Redemption",
    "The Green Mile", "Se7en", "Saving Private Ryan", "The Silence of the Lambs", "Braveheart", 
    "Goodfellas", "The Usual Suspects", "Leon: The Professional", "American History X", "Fight Club",
    "The Pianist", "Coco", "Your Name", "Spirited Away", "Inside Out", 
    "Toy Story", "The Incredibles", "Finding Nemo", "Ratatouille", "Monsters Inc."
];

const movies = movieTitles.map((title, i) => ({
    id: i,
    title: title,
    year: 2000 + (i % 26),
    genre: ["Action", "Sci-Fi", "Drama", "Thriller", "Animation"][i % 5],
    rating: (4 + Math.random()).toFixed(1),
    img: `https://picsum.photos/seed/${i + 123}/400/600`,
    trailer: `https://www.youtube.com/results?search_query=${encodeURIComponent(title + " official trailer")}`,
    desc: `Experience the breathtaking story of ${title}. A cinematic masterpiece that redefines the ${["Action", "Sci-Fi", "Drama", "Thriller", "Animation"][i % 5]} genre.`
}));

// 2. SEARCH LOGIC
function performSearch() {
    const searchInput = document.getElementById('searchInput');
    if (!searchInput) return;
    
    const query = searchInput.value.toLowerCase();
    const filtered = movies.filter(m => 
        m.title.toLowerCase().includes(query) || 
        m.genre.toLowerCase().includes(query)
    );
    renderGrid(filtered);
    
    const grid = document.getElementById('movieGrid');
    if (grid) grid.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// 3. AUTH MODAL LOGIC (SIGN IN / SIGN UP)
function openAuth() {
    const modal = document.getElementById('authModal');
    if (modal) {
        modal.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
        console.log("Auth Modal Opened Successfully");
    } else {
        console.error("Error: Element with ID 'authModal' not found in HTML.");
    }
}

function closeAuth() {
    const modal = document.getElementById('authModal');
    if (modal) {
        modal.classList.add('hidden');
        document.body.style.overflow = 'auto';
    }
}

// 4. MOVIE DETAIL MODAL
// Function to handle the actual rating click
function submitRating(stars) {
    alert(`Thank you! You rated this film ${stars} out of 5 stars.`);
    // In a real app, you would save this to a database here.
}

function openModal(id) {
    const m = movies.find(x => x.id === id);
    const content = document.getElementById('modalContent');
    const modal = document.getElementById('movieModal');
    
    if (content) {
content.innerHTML = `
    <button onclick="closeModal()" class="absolute top-6 right-8 text-4xl text-white/50 hover:text-white transition">&times;</button>

    <img src="${m.img}" class="w-full md:w-80 rounded-2xl shadow-2xl border border-white/10">
    <div class="flex-1 text-left">
        <h2 class="text-4xl md:text-5xl font-black mb-2">FILM<span style="color: #fbbf24;">DOM</span></h2>
        <h3 class="text-2xl font-bold mb-4 text-white/90">${m.title} <span class="text-gray-600">(${m.year})</span></h3>
        
        <p class="text-gray-400 text-lg mb-8 italic">"${m.desc}"</p>
        
        <div class="mb-10 p-6 bg-white/5 rounded-2xl border border-white/5">
            <p class="text-[10px] uppercase tracking-widest text-gray-500 mb-3 font-bold">Rate this Motion Picture</p>
            <div class="flex gap-2 text-2xl" id="userStarRating">
                <i class="fa-regular fa-star cursor-pointer" onclick="submitRating(1)"></i>
                <i class="fa-regular fa-star cursor-pointer" onclick="submitRating(2)"></i>
                <i class="fa-regular fa-star cursor-pointer" onclick="submitRating(3)"></i>
                <i class="fa-regular fa-star cursor-pointer" onclick="submitRating(4)"></i>
                <i class="fa-regular fa-star cursor-pointer" onclick="submitRating(5)"></i>
            </div>
        </div>

        <div class="flex flex-wrap gap-4">
            <a href="${m.trailer}" target="_blank" class="bg-[#fbbf24] text-black px-10 py-4 rounded-full font-black uppercase text-xs tracking-widest hover:scale-105 transition shadow-lg shadow-[#fbbf24]/20">Watch Trailer</a>
            
            <button onclick="closeModal()" class="border border-white/20 px-10 py-4 rounded-full font-bold uppercase text-xs tracking-widest hover:bg-white/10 transition">Back to Library</button>
        </div>
    </div>
`;
    
    }
    
    if (modal) {
        modal.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
    }
}

// 5. RENDERING ENGINE
// --- STAR LOGIC HELPER ---
// This function converts a number like 4.7 into 4 full stars and 1 half star
function getStars(rating) {
    let stars = '';
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    for (let i = 0; i < fullStars; i++) {
        stars += '<i class="fa-solid fa-star text-[#fbbf24]"></i>';
    }
    if (hasHalfStar) {
        stars += '<i class="fa-solid fa-star-half-stroke text-[#fbbf24]"></i>';
    }
    for (let i = fullStars + (hasHalfStar ? 1 : 0); i < 5; i++) {
        stars += '<i class="fa-regular fa-star text-gray-600"></i>';
    }
    return stars;
}

// --- UPDATED RENDERING ENGINE ---
function renderGrid(data = movies) {
    const grid = document.getElementById('movieGrid');
    if (!grid) return;

    // Clear the grid and map through the movie data
    grid.innerHTML = data.map(m => `
        <div class="movie-card group cursor-pointer rounded-2xl overflow-hidden bg-white/5 border border-white/10 transition-all hover:-translate-y-2" onclick="openModal(${m.id})">
            <div class="h-80 overflow-hidden relative">
                <img src="${m.img}" alt="${m.title}" class="w-full h-full object-cover group-hover:scale-110 transition duration-700">
                <div class="absolute top-4 right-4 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full text-[#fbbf24] text-xs font-bold border border-white/10">
                    <i class="fa-solid fa-star mr-1"></i>${m.rating}
                </div>
            </div>
            <div class="p-6">
                <span class="text-[10px] text-[#fbbf24] tracking-widest uppercase font-bold">${m.genre}</span>
                <h3 class="text-xl font-black mt-1 group-hover:text-[#fbbf24] transition truncate">${m.title}</h3>
                
                <div class="flex items-center gap-1 mt-3 text-[10px]">
                    ${getStars(m.rating)}
                    <span class="text-gray-500 ml-2">(${m.year})</span>
                </div>
            </div>
        </div>
    `).join('');
}

// 6. INITIALIZATION & FORCE-FIX
window.onload = () => {
    renderGrid();

    // Force-fix for Search Button if ID is correct
    const searchBtn = document.getElementById('searchBtn');
    if (searchBtn) {
        searchBtn.onclick = performSearch;
    }

    // Enter Key Search Support
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') performSearch();
        });
    }

    // CRITICAL: Force-fix for Sign In Button
    // This looks for any button that contains the word "Sign In" and connects it
    const allButtons = document.getElementsByTagName('button');
    for (let btn of allButtons) {
        if (btn.innerText.includes("Sign In") || btn.innerText.includes("Sign Up")) {
            btn.onclick = openAuth;
        }
    }
};
function closeModal() {
    const modal = document.getElementById('movieModal');
    if (modal) {
        modal.classList.add('hidden'); // This hides the modal
        document.body.style.overflow = 'auto'; // This enables scrolling again
    }
}