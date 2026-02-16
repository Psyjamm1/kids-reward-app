#!/bin/bash

# Create the HTML header
cat > index.html << 'HTML_START'
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="Kids Reward App - Star Rewards">
  <meta name="theme-color" content="#5f27cd">
  <title>Kids Reward App</title>
  <script crossorigin src="https://unpkg.com/react@18.2.0/umd/react.production.min.js"></script>
  <script crossorigin src="https://unpkg.com/react-dom@18.2.0/umd/react-dom.production.min.js"></script>
  <script src="https://unpkg.com/@babel/standalone@7.23.5/babel.min.js"></script>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: 'Segoe UI', sans-serif; }
    #root { min-height: 100vh; }
  </style>
</head>
<body>
  <div id="root"></div>
  <script type="text/babel">
const { useState, useEffect, useRef, useCallback } = React;

HTML_START

# Add the app code (skip the import line)
tail -n +2 /mnt/user-data/outputs/kids_reward_app_FIXED.jsx >> index.html

# Add the render code and close
cat >> index.html << 'HTML_END'

// Render the app
const rootElement = document.getElementById('root');
ReactDOM.render(React.createElement(App), rootElement);
  </script>
</body>
</html>
HTML_END

echo "index.html created successfully!"

