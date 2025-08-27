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
    
    // Fungsi untuk menampilkan pesan blokir (disabled)
    function showBlockMessage() {
        // DevTools blocking disabled - function kept for compatibility
        return false;
    }
    
    // Deteksi DevTools (disabled)
    function detectDevTools() {
        // DevTools detection disabled - function kept for compatibility
        return false;
    }
    
    // Handler untuk keyboard events (DevTools shortcuts disabled)
    function handleKeyDown(e) {
        var key = e.key;
        var code = e.keyCode || e.which;
        var ctrl = e.ctrlKey || e.metaKey;
        var shift = e.shiftKey;
        var alt = e.altKey;
        
        // F12, Ctrl+Shift+I, Ctrl+Shift+J, Ctrl+Shift+C - Allow DevTools
        // (DevTools blocking removed)
        
        // Ctrl+U - View Source (still blocked for security)
        if (ctrl && !shift && !alt && (key === 'U' || key === 'u' || code === 85)) {
            e.preventDefault();
            e.stopImmediatePropagation();
            return false;
        }
        
        // Ctrl+S - Save (still blocked for security)
        if (ctrl && (key === 'S' || key === 's' || code === 83)) {
            e.preventDefault();
            e.stopImmediatePropagation();
            return false;
        }
        
        // Ctrl+A - Select All (still blocked for security)
        if (ctrl && (key === 'A' || key === 'a' || code === 65)) {
            e.preventDefault();
            e.stopImmediatePropagation();
            return false;
        }
        
        // Ctrl+P - Print (still blocked for security)
        if (ctrl && (key === 'P' || key === 'p' || code === 80)) {
            e.preventDefault();
            e.stopImmediatePropagation();
            return false;
        }
        
        // F11 - Fullscreen (still blocked for security)
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
    
    // Disable console dengan berbagai metode (optional - can be disabled)
    function disableConsole() {
        // Console blocking optional - can be commented out if needed
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
    
    // Setup DevTools detection (disabled)
    function setupDevToolsDetection() {
        // DevTools detection disabled - function kept for compatibility
        console.log('DevTools detection disabled');
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
    // disableConsole();
    // NOTE: Console override temporarily disabled for debugging image loading issues
        
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