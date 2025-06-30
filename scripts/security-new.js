// Website Security Protection
// Much. Trie Harnanto Portfolio - 2025

(function() {
    'use strict';
    
    // Console Protection
    console.log('%c⚠️ STOP!', 'color: #dc2626; font-size: 50px; font-weight: bold; text-shadow: 2px 2px 0px #991b1b;');
    console.log('%c🔒 This is a browser feature intended for developers only.', 'color: #dc2626; font-size: 16px; font-weight: bold;');
    console.log('%c🚫 Unauthorized access to this website is prohibited.', 'color: #dc2626; font-size: 16px; font-weight: bold;');
    console.log('%c💻 Portfolio by Much. Trie Harnanto - Cybersecurity Enthusiast', 'color: #0078d4; font-size: 14px;');
    
    // Security alert function
    function showSecurityAlert(message) {
        const alertDiv = document.createElement('div');
        alertDiv.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: linear-gradient(135deg, #dc2626, #991b1b);
            color: white;
            padding: 15px 20px;
            border-radius: 8px;
            z-index: 10000;
            font-family: 'Poppins', Arial, sans-serif;
            font-size: 14px;
            font-weight: 500;
            box-shadow: 0 10px 30px rgba(220, 38, 38, 0.3);
            transform: translateX(400px);
            transition: all 0.3s ease;
        `;
        alertDiv.innerHTML = `🔒 ${message}`;
        
        document.body.appendChild(alertDiv);
        
        setTimeout(() => {
            alertDiv.style.transform = 'translateX(0)';
        }, 100);
        
        setTimeout(() => {
            alertDiv.style.transform = 'translateX(400px)';
            setTimeout(() => {
                if (alertDiv.parentNode) {
                    alertDiv.parentNode.removeChild(alertDiv);
                }
            }, 300);
        }, 3000);
    }
    
    // DevTools state
    let devtools = { open: false };
    
    // Block page function
    function showBlockPage(reason) {
        document.body.innerHTML = `
            <div style="
                display: flex; 
                flex-direction: column;
                justify-content: center; 
                align-items: center; 
                height: 100vh; 
                background: linear-gradient(135deg, #0a0a0a, #1a1a1a); 
                color: #dc2626; 
                font-family: 'Poppins', Arial, sans-serif;
                text-align: center;
                padding: 20px;
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                z-index: 999999;
            ">
                <div style="font-size: 5rem; margin-bottom: 30px; animation: pulse 2s infinite;">🔒</div>
                <h1 style="font-size: 3rem; margin-bottom: 20px; color: #dc2626; text-shadow: 2px 2px 4px rgba(0,0,0,0.5);">AKSES DITOLAK</h1>
                <p style="font-size: 1.5rem; margin-bottom: 15px; color: #ff6b6b; font-weight: bold;">Deteksi Developer Tools!</p>
                <p style="font-size: 1.2rem; margin-bottom: 10px; color: #a1a1aa;">Alasan: ${reason}</p>
                <p style="font-size: 1rem; color: #a1a1aa; margin-bottom: 30px;">Silakan tutup developer tools dan refresh halaman.</p>
                <div style="margin-bottom: 30px;">
                    <p style="color: #fbbf24; font-size: 1.1rem; margin-bottom: 10px;">⚠️ Portfolio ini dilindungi oleh sistem keamanan berlapis</p>
                    <p style="color: #60a5fa; font-size: 0.9rem;">Dibuat oleh: Much. Trie Harnanto - Cybersecurity Enthusiast</p>
                </div>
                <button onclick="location.reload()" style="
                    margin-top: 20px;
                    padding: 15px 30px;
                    background: linear-gradient(135deg, #dc2626, #991b1b);
                    color: white;
                    border: none;
                    border-radius: 12px;
                    font-size: 1.1rem;
                    font-weight: bold;
                    cursor: pointer;
                    transition: all 0.3s ease;
                    box-shadow: 0 4px 15px rgba(220, 38, 38, 0.3);
                " onmouseover="this.style.transform='scale(1.05)'; this.style.boxShadow='0 6px 20px rgba(220, 38, 38, 0.4)'" 
                   onmouseout="this.style.transform='scale(1)'; this.style.boxShadow='0 4px 15px rgba(220, 38, 38, 0.3)'">
                    🔄 Refresh Halaman
                </button>
            </div>
            <style>
                @keyframes pulse {
                    0% { transform: scale(1); }
                    50% { transform: scale(1.1); }
                    100% { transform: scale(1); }
                }
            </style>
        `;
    }
    
    // DevTools detection
    function detectDevTools() {
        if (window.outerHeight - window.innerHeight > 200 || 
            window.outerWidth - window.innerWidth > 200) {
            if (!devtools.open) {
                devtools.open = true;
                console.clear();
                showBlockPage('Window size manipulation detected');
            }
        }
    }
    
    // Monitor DevTools every 500ms
    setInterval(detectDevTools, 500);
    
    // Right-click protection
    document.addEventListener('contextmenu', function(e) {
        e.preventDefault();
        showSecurityAlert('Right-click dinonaktifkan untuk keamanan');
        return false;
    }, true);
    
    // Keyboard shortcuts protection
    document.addEventListener('keydown', function(e) {
        // Block F12, Ctrl+Shift+I, Ctrl+Shift+J, Ctrl+Shift+C, Ctrl+U, Ctrl+S
        if (e.keyCode === 123 || 
            (e.ctrlKey && e.shiftKey && e.keyCode === 73) ||
            (e.ctrlKey && e.shiftKey && e.keyCode === 74) ||
            (e.ctrlKey && e.shiftKey && e.keyCode === 67) ||
            (e.ctrlKey && e.keyCode === 85) ||
            (e.ctrlKey && e.keyCode === 83)) {
            
            e.preventDefault();
            e.stopPropagation();
            showSecurityAlert('Akses developer tools diblokir!');
            return false;
        }
    }, true);
    
    // Disable text selection and drag
    document.onselectstart = function() { return false; };
    document.ondragstart = function() { return false; };
    
    // Disable printing
    window.addEventListener('beforeprint', function(e) {
        e.preventDefault();
        showSecurityAlert('Printing diblokir untuk keamanan');
        return false;
    });
    
    // Window focus protection
    window.addEventListener('blur', function() {
        document.body.style.filter = 'blur(5px)';
        document.body.style.pointerEvents = 'none';
    });
    
    window.addEventListener('focus', function() {
        document.body.style.filter = 'none';
        document.body.style.pointerEvents = 'auto';
    });
    
    // Clear console periodically
    setInterval(function() {
        console.clear();
        console.log('%c🔒 Portfolio Terlindungi', 'color: #dc2626; font-size: 16px; font-weight: bold;');
        console.log('%c⚠️ Akses developer tools dilarang!', 'color: #ff6b6b; font-size: 14px; font-weight: bold;');
        console.log('%c📧 Kontak: mtrie.h@gmail.com', 'color: #6b7280; font-size: 12px;');
    }, 5000);
    
    // Directory protection
    function initDirectoryProtection() {
        const currentPath = window.location.pathname;
        
        // Allow main page access
        if (currentPath === '/' || currentPath === '/index.html' || currentPath === '') {
            return;
        }
        
        // Block directory access
        const protectedPaths = ['/images/', '/scripts/', '/styles/', '/admin/', '/config/', '/api/'];
        const isBlocked = protectedPaths.some(path => currentPath === path || currentPath.endsWith(path));
        
        if (isBlocked || currentPath.includes('..')) {
            showSecurityAlert('Akses direktori diblokir');
            setTimeout(() => window.location.replace('/'), 2000);
        }
    }
    
    // Initialize protections
    initDirectoryProtection();
    
    // Protection status
    console.log('%c💼 Portfolio: Much. Trie Harnanto', 'color: #0078d4; font-size: 14px;');
    console.log('%c🛡️ Keamanan: Sistem proteksi berlapis aktif', 'color: #22c55e; font-size: 12px;');
    console.log('%c🔒 Proteksi Direktori: Aktif', 'color: #dc2626; font-size: 12px;');
    console.log('%c📧 Kontak: mtrie.h@gmail.com', 'color: #6b7280; font-size: 12px;');
    
})();

// Config with encoded data
const CONFIG = {
    email: atob('bXRyaWUuaEBnbWFpbC5jb20='), // mtrie.h@gmail.com
    phone: atob('KzYyIDg3NzE0NjM1Nzk3'), // +62 87714635797
    location: atob('V2VzdCBCYW5kdW5nLCBXZXN0IEphdmE='), // West Bandung, West Java
    analytics: {
        enabled: false,
        trackVisitors: false
    },
    security: {
        level: 'high',
        devToolsBlocked: true,
        rightClickDisabled: true,
        sourceViewBlocked: true
    }
};

// Initialize additional security on DOM ready
document.addEventListener('DOMContentLoaded', function() {
    console.log('%c🚀 Portfolio dimuat dengan proteksi keamanan', 'color: #22c55e; font-size: 14px;');
    
    // Additional click protection
    document.addEventListener('click', function(e) {
        const target = e.target;
        const href = target.href || target.getAttribute('href');
        
        if (href) {
            const blockedPaths = ['../', '../\\', '/admin/', '/config/', '/api/', '/backup/'];
            blockedPaths.forEach(path => {
                if (href.includes(path)) {
                    e.preventDefault();
                    console.error('🚨 Blocked navigation to:', href);
                    showSecurityAlert('Navigasi diblokir oleh kebijakan keamanan');
                    return false;
                }
            });
        }
    });
    
    console.log('%c🔒 Proteksi lanjutan diinisialisasi', 'color: #dc2626; font-size: 12px;');
});
