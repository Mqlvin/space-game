const HTML_ENTITIES = new Map([
    [" ","&nbsp;"],
    ["<","&lt;"],
    [">","&gt;"],
    ["&","&amp;"],
    ["\"","&quot;"],
    ["'","&apos;"],
    ["¢","&cent;"],
    ["£","&pound;"],
    ["¥","&yen;"],
    ["€","&euro;"],
    ["©","&copy;"],
    ["®","&reg"]
]);

export class Utils {
    static async asyncDelay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    static translateStringToHTML(string) {
        let preprocessed = string;
        
        // convert special characters
        HTML_ENTITIES.forEach((k, v) => {
            preprocessed = preprocessed.replace(k, v);
        });
    
    
        return string;
    }
    
    static getIcon(name) {
        if(name.toLowerCase() == "you") {
            return "👨‍🚀";
        } else if(name.toLowerCase() == "computer") {
            return "💻";
        } else {
            return "📻";
        }
    }

    static interpolateValues(steps, number1, number2) {
        const values = [];
        
        for (let i = 0; i <= steps; i++) {
            let modifier = i / steps;

            let interpolatedValue = number1 + (number2 - number1) * modifier;
    
            values.push(interpolatedValue);
        }
    
        return values;
    }

    static clampI(value, min, max) {
        return Math.max(Math.min(value, max), min);
    }
}