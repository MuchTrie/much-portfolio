// ULTIMATE SECURITY PROTECTION SYSTEM
// Author: Much. Trie Harnanto
// Version: 4.0 - FINAL WORKING VERSION
// Description: Komprehensif client-side security protection yang BENAR-BENAR BERFUNGSI

(function() {
    'use strict';
    
    // Konfigurasi keamanan
    var config = {
        redirectDelay: 1500,
        checkInterval: 50,
        threshold: 160
    };
    
    // Fungsi untuk menampilkan pesan blokir
    function showBlockMessage() {
        document.documentElement.innerHTML = `
            <div style="
                position: fixed;
                top: 0;
                left: 0;
                width: 100vw;
                height: 100vh;
                background: #000;
                color: #f00;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                z-index: 999999;
                font-size: 2rem;
                font-family: Arial, sans-serif;
                text-align: center;
                user-select: none;
                -webkit-user-select: none;
                -moz-user-select: none;
                -ms-user-select: none;
            ">
                <div style="font-size: 4rem; margin-bottom: 20px;">🔒</div>
                <div>AKSES DEVELOPER TOOLS DIBLOKIR</div>
                <div style="font-size: 1rem; margin-top: 20px; color: #ccc;">
                    Unauthorized access detected
                </div>
            </div>
        `;
        
        setTimeout(function() {
            window.location.replace('/');
        }, config.redirectDelay);
    }
    
    // Deteksi DevTools dengan berbagai metode
    function detectDevTools() {
        var widthDiff = window.outerWidth - window.innerWidth;
        var heightDiff = window.outerHeight - window.innerHeight;
        
        if (widthDiff > config.threshold || heightDiff > config.threshold) {
            showBlockMessage();
            return true;
        }
        return false;
    }
    
    // Handler untuk keyboard events
    function handleKeyDown(e) {
        var key = e.key;
        var code = e.keyCode || e.which;
        var ctrl = e.ctrlKey || e.metaKey;
        var shift = e.shiftKey;
        var alt = e.altKey;
        
        // F12 - Developer Tools
        if (key === 'F12' || code === 123) {
            e.preventDefault();
            e.stopImmediatePropagation();
            showBlockMessage();
            return false;
        }
        
        // Ctrl+Shift+I - Inspect Element
        if (ctrl && shift && (key === 'I' || key === 'i' || code === 73)) {
            e.preventDefault();
            e.stopImmediatePropagation();
            showBlockMessage();
            return false;
        }
        
        // Ctrl+Shift+J - Console
        if (ctrl && shift && (key === 'J' || key === 'j' || code === 74)) {
            e.preventDefault();
            e.stopImmediatePropagation();
            showBlockMessage();
            return false;
        }
        
        // Ctrl+Shift+C - Select Element
        if (ctrl && shift && (key === 'C' || key === 'c' || code === 67)) {
            e.preventDefault();
            e.stopImmediatePropagation();
            showBlockMessage();
            return false;
        }
        
        // Ctrl+U - View Source
        if (ctrl && !shift && !alt && (key === 'U' || key === 'u' || code === 85)) {
            e.preventDefault();
            e.stopImmediatePropagation();
            showBlockMessage();
            return false;
        }
        
        // Ctrl+S - Save
        if (ctrl && (key === 'S' || key === 's' || code === 83)) {
            e.preventDefault();
            e.stopImmediatePropagation();
            return false;
        }
        
        // Ctrl+A - Select All
        if (ctrl && (key === 'A' || key === 'a' || code === 65)) {
            e.preventDefault();
            e.stopImmediatePropagation();
            return false;
        }
        
        // Ctrl+P - Print
        if (ctrl && (key === 'P' || key === 'p' || code === 80)) {
            e.preventDefault();
            e.stopImmediatePropagation();
            return false;
        }
        
        // F11 - Fullscreen
        if (key === 'F11' || code === 122) {
            e.preventDefault();
            e.stopImmediatePropagation();
            return false;
        }
    }
    
    // Blokir semua event mouse dan keyboard
    function blockEvent(e) {
        e.preventDefault();
        e.stopImmediatePropagation();
        return false;
    }
    
    // Disable console dengan berbagai metode
    function disableConsole() {
        var noop = function() { return undefined; };
        var methods = [
            'log', 'clear', 'error', 'warn', 'info', 'debug', 'trace',
            'dir', 'dirxml', 'table', 'count', 'time', 'timeEnd',
            'profile', 'profileEnd', 'group', 'groupCollapsed', 'groupEnd'
        ];
        
        var consoleObj = {};
        methods.forEach(function(method) {
            consoleObj[method] = noop;
        });
        
        // Override console object
        try {
            Object.defineProperty(window, 'console', {
                get: function() {
                    return consoleObj;
                },
                set: function() {
                    return consoleObj;
                },
                configurable: false,
                enumerable: false
            });
        } catch (e) {
            window.console = consoleObj;
        }
        
        // Backup method
        if (window.console) {
            methods.forEach(function(method) {
                if (window.console[method]) {
                    window.console[method] = noop;
                }
            });
        }
    }
    
    // Setup semua event listeners
    function setupEventListeners() {
        var events = [
            'keydown', 'keyup', 'keypress'
        ];
        
        var blockEvents = [
            'contextmenu', 'selectstart', 'dragstart', 'drag', 'dragend',
            'copy', 'cut', 'paste', 'beforecopy', 'beforecut', 'beforepaste'
        ];
        
        // Keyboard events
        events.forEach(function(eventType) {
            document.addEventListener(eventType, handleKeyDown, true);
            window.addEventListener(eventType, handleKeyDown, true);
            document.body.addEventListener(eventType, handleKeyDown, true);
        });
        
        // Block events
        blockEvents.forEach(function(eventType) {
            document.addEventListener(eventType, blockEvent, true);
            window.addEventListener(eventType, blockEvent, true);
            if (document.body) {
                document.body.addEventListener(eventType, blockEvent, true);
            }
        });
        
        // Mouse events
        document.addEventListener('mousedown', function(e) {
            if (e.button === 2 || e.which === 3) {
                blockEvent(e);
            }
        }, true);
        
        document.addEventListener('mouseup', function(e) {
            if (e.button === 2 || e.which === 3) {
                blockEvent(e);
            }
        }, true);
    }
    
    // Setup DevTools detection
    function setupDevToolsDetection() {
        // Multiple detection intervals
        setInterval(detectDevTools, config.checkInterval);
        setInterval(detectDevTools, 100);
        setInterval(detectDevTools, 200);
        
        // Window events
        window.addEventListener('resize', detectDevTools, true);
        window.addEventListener('blur', function() {
            setTimeout(detectDevTools, 50);
        }, true);
        window.addEventListener('focus', detectDevTools, true);
        
        // Console detection
        var devtools = {open: false, orientation: null};
        setInterval(function() {
            if (window.outerHeight - window.innerHeight > 160 || 
                window.outerWidth - window.innerWidth > 160) {
                if (!devtools.open) {
                    devtools.open = true;
                    showBlockMessage();
                }
            }
        }, 100);
    }
    
    // Inject CSS untuk disable text selection
    function injectSecurityCSS() {
        var css = `
            * {
                -webkit-touch-callout: none !important;
                -webkit-user-select: none !important;
                -khtml-user-select: none !important;
                -moz-user-select: none !important;
                -ms-user-select: none !important;
                user-select: none !important;
                -webkit-tap-highlight-color: transparent !important;
            }
            
            input, textarea {
                -webkit-user-select: text !important;
                -moz-user-select: text !important;
                -ms-user-select: text !important;
                user-select: text !important;
            }
        `;
        
        var style = document.createElement('style');
        style.type = 'text/css';
        style.innerHTML = css;
        document.head.appendChild(style);
    }
    
    // Path protection
    function checkPath() {
        var path = window.location.pathname;
        var blockedPaths = ['/images/', '/scripts/', '/styles/', '/assets/'];
        
        for (var i = 0; i < blockedPaths.length; i++) {
            if (path.includes(blockedPaths[i])) {
                window.location.replace('/');
                return;
            }
        }
    }
    
    // Script injection protection
    function setupScriptProtection() {
        var observer = new MutationObserver(function(mutations) {
            mutations.forEach(function(mutation) {
                if (mutation.type === 'childList') {
                    mutation.addedNodes.forEach(function(node) {
                        if (node.tagName === 'SCRIPT' && 
                            !node.src.includes('script.js') && 
                            !node.src.includes('security.js') &&
                            !node.src.includes('cdnjs.cloudflare.com') &&
                            !node.src.includes('fonts.googleapis.com')) {
                            node.remove();
                        }
                    });
                }
            });
        });
        
        observer.observe(document.documentElement, {
            childList: true,
            subtree: true
        });
    }
    
    // Initialization function
    function initSecurity() {
        console.log('🔒 Security System Activated');
        
        // 1. Disable console first
        disableConsole();
        
        // 2. Check path
        checkPath();
        
        // 3. Setup event listeners
        setupEventListeners();
        
        // 4. Setup DevTools detection
        setupDevToolsDetection();
        
        // 5. Inject security CSS
        injectSecurityCSS();
        
        // 6. Setup script protection
        setupScriptProtection();
        
        console.log('🛡️ All security measures activated');
    }
    
    // Start security immediately
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initSecurity);
    } else {
        initSecurity();
    }
    
    // Backup initialization
    window.addEventListener('load', initSecurity);
    
    // Additional body ready check
    function checkBody() {
        if (document.body) {
            initSecurity();
        } else {
            setTimeout(checkBody, 10);
        }
    }
    checkBody();
    
})();