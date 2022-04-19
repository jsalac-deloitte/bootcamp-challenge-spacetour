module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./node_modules/flowbite/**/*.js"],
  theme: {
    extend: {
      backgroundImage: {
        "mobile-home":
          "url('../public/assets/home/background-home-mobile.jpg')",
        "tablet-home":
          "url('../public/assets/home/background-home-tablet.jpg')",
        "desktop-home":
          "url('../public/assets/home/background-home-desktop.jpg')",
        "mobile-technology":
          "url('../public/assets/technology/background-technology-mobile.jpg')",
        "tablet-technology":
          "url('../public/assets/technology/background-technology-tablet.jpg')",
        "desktop-technology":
          "url('../public/assets/technology/background-technology-desktop.jpg')",
        "desktop-destination":
          "url('../public/assets/destination/background-destination-desktop.jpg')",
        "tablet-destination":
          "url('../public/assets/destination/background-destination-tablet.jpg')",
        "mobile-destination":
          "url('../public/assets/destination/background-destination-mobile.jpg')",
        "mobile-crew":
          "url('../public/assets/crew/background-crew-mobile.jpg')",
        "tablet-crew":
          "url('../public/assets/crew/background-crew-tablet.jpg')",
        "desktop-crew":
          "url('../public/assets/crew/background-crew-desktop.jpg')",
        "desktop-mission": "url('../public/assets/space-photo.jpeg')",
      },
      fontFamily: {
        "barlow-condensed": ["Barlow Condensed", "sans-serif"],
        barlow: ["Barlow", "sans-serif"],
        bellefair: ["Bellefair", "serif"],
      },
      colors: {
        caption: "#FFFFFF",
        desc: "#D0D6F9",
      },
    },
  },
  plugins: [require("flowbite/plugin")],
};
