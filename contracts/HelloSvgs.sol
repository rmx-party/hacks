// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

//  ________  _____ ______      ___    ___ ________  ________  ________  _________    ___    ___
// |\   __  \|\   _ \  _   \   |\  \  /  /|\   __  \|\   __  \|\   __  \|\___   ___\ |\  \  /  /|
// \ \  \|\  \ \  \\\__\ \  \  \ \  \/  / \ \  \|\  \ \  \|\  \ \  \|\  \|___ \  \_| \ \  \/  / /
//  \ \   _  _\ \  \\|__| \  \  \ \    / / \ \   ____\ \   __  \ \   _  _\   \ \  \   \ \    / /
//   \ \  \\  \\ \  \    \ \  \  /     \/ __\ \  \___|\ \  \ \  \ \  \\  \|   \ \  \   \/  /  /
//    \ \__\\ _\\ \__\    \ \__\/  /\   \|\__\ \__\    \ \__\ \__\ \__\\ _\    \ \__\__/  / /
//     \|__|\|__|\|__|     \|__/__/ /\ __\|__|\|__|     \|__|\|__|\|__|\|__|    \|__|\___/ /
//     https://www.rmx.party   |__|/ \|__|                                          \|___|/

library HelloSvgs {
    function createSvgParameterized(
        string memory background,
        string memory fontFamily,
        string memory yPos,
        string memory xPos,
        string memory fill,
        string memory text
    ) internal pure returns (string memory) {
        return
            string(
                abi.encodePacked(
                    '<svg width="800" height="800" xmlns="http://www.w3.org/2000/svg">',
                    "<style>svg{background-color: ",
                    background,
                    "; font-family: ",
                    fontFamily,
                    "; font-size: 64px;}</style>",
                    '<text y="',
                    yPos,
                    '" x="',
                    xPos,
                    '" fill="',
                    fill,
                    '">',
                    text,
                    "</text>",
                    "</svg>"
                )
            );
    }

    function createSvgHelloWorld() internal pure returns (string memory) {
        return
            createSvgParameterized(
                "white",
                "monospace",
                "128",
                "64",
                "black",
                "Hello, World!"
            );
    }

    function createSvgPizzaBagel() internal pure returns (string memory) {
        return
            createSvgParameterized(
                "blue",
                "cursive",
                "128",
                "64",
                "#00ff00",
                "Pizza, Bagel!"
            );
    }

    function createSvgCollection() internal pure returns (string memory) {
        return string(abi.encodePacked(unicode'<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" height="400"  width="600"><defs><path id="b" fill="#000068" d="M294 204h98v4h-98z"/><path id="c" fill="#000068" d="M353 196h16v4h-16z"/><path id="d" fill="#000068" d="M339 192h14v4h-14z"/><path id="e" fill="#000068" d="M323 188h16v4h-16z"/><path id="f" fill="#000068" d="M361 180h16v4h-16z"/><path id="g" fill="#000068" d="M345 176h16v4h-16z"/><path id="h" fill="#000068" d="M353 188h40v4h-40z"/></defs><path fill="#171717" d="M0 0h600v400H0z"/><text x="153" y="296" fill="#fff" font-size="40" font-family="monospace">RMXhacks—001</text><path fill="#E5E5E5" stroke="#2C2C43" stroke-width="4" d="M203.16 225.93v-2h-5.28V204h94.16v7.64h7.63v8.22h8.21V232H203.17v-6.07Z"/><path fill="#2C2C43" d="M257.98 209.98h26v4h-26zm-6 0h4v4h-4z"/><path fill="#E5E5E5" stroke="#2C2C43" stroke-width="4" d="M206.81 192.39v-2h-10.56v-59.83h10.56V125h85.22v14.5h8.22v57.33h-8.22V204h-85.21v-11.61Z"/><path fill="#00F" stroke="#2C2C43" stroke-width="4" d="M282 190h-64v-50h64v50Z"/><path fill="#fff" d="M220 142h60v.5h-60v-.5Zm0 .8h60v.5h-60v-.5Zm0 .8h60v.5h-60v-.5Zm0 .8h60v.5h-60v-.5Zm0 .8h60v.5h-60v-.5Zm0 .8h60v.5h-60v-.5Zm0 .8h60v.5h-60v-.5Zm0 .8h60v.5h-60v-.5Zm0 .8h60v.5h-60v-.5Zm0 .8h60v.5h-60v-.5Zm0 .8h60v.5h-60v-.5Zm0 .8h60v.5h-60v-.5Zm0 .8h60v.5h-60v-.5Zm0 .8h60v.5h-60v-.5Zm0 .8h60v.5h-60v-.5Zm0 .8h60v.5h-60v-.5Zm0 .8h60v.5h-60v-.5Zm0 .8h60v.5h-60v-.5Zm0 .8h60v.5h-60v-.5Zm0 .8h60v.5h-60v-.5Zm0 .8h60v.5h-60v-.5Zm0 .8h60v.5h-60v-.5Zm0 .8h60v.5h-60v-.5Zm0 .8h60v.5h-60v-.5Zm0 .8h60v.5h-60v-.5Zm0 .8h60v.5h-60v-.5Zm0 .8h60v.5h-60v-.5Zm0 .8h60v.5h-60v-.5Zm0 .8h60v.5h-60v-.5Zm0 .8h60v.5h-60v-.5Zm0 .8h60v.5h-60v-.5Zm0 .8h60v.5h-60v-.5Zm0 .8h60v.5h-60v-.5Zm0 .8h60v.5h-60v-.5Zm0 .8h60v.5h-60v-.5Zm0 .8h60v.5h-60v-.5Zm0 .8h60v.5h-60v-.5Zm0 .8h60v.5h-60v-.5Zm0 .8h60v.5h-60v-.5Zm0 .8h60v.5h-60v-.5Zm0 .8h60v.5h-60v-.5Zm0 .8h60v.5h-60v-.5Zm0 .8h60v.5h-60v-.5Zm0 .8h60v.5h-60v-.5Zm0 .8h60v.5h-60v-.5Zm0 .8h60v.5h-60v-.5Zm0 .8h60v.5h-60v-.5Zm0 .8h60v.5h-60v-.5Zm0 .8h60v.5h-60v-.5Zm0 .8h60v.5h-60v-.5Zm0 .8h60v.5h-60v-.5Zm0 .8h60v.5h-60v-.5Zm0 .8h60v.5h-60v-.5Zm0 .8h60v.5h-60v-.5Zm0 .8h60v.5h-60v-.5Zm0 .8h60v.5h-60v-.5Zm0 .8h60v.5h-60v-.5Zm0 .8h60v.5h-60v-.5Z"/><g clip-path="url(#a)"><path fill="#fff" stroke="#000" stroke-width=".34" d="m231.15 173.53 27.66-6.75 11.34 9.28-27.66 6.72-11.34-9.25Z"/><path fill="#fff" stroke="#000" stroke-width=".34" d="m231.12 169.61 27.66-6.75 11.34 9.28-27.67 6.72-11.33-9.25Z"/><path fill="#fff" stroke="#000" stroke-width=".34" d="m231.18 165.78 27.69-6.72 11.31 9.25-27.66 6.75-11.34-9.28Z"/><path fill="#fff" stroke="#00F" stroke-width=".5" d="m231 161.83 27.03-6.78 10.97 9.23-27.06 6.77-10.94-9.22Z"/><path fill="#fff" d="m237.65 159.7 16.67-4.12v.97l-16.67 4.28v-1.13Z"/><path fill="#00F" d="m240.43 152.55 3.54-.88v1.39l1.17-.3v5.52l-1.17.3v1.38l-1.17.3v1.4l1.17-.31v1.39l1.17-.3v2.77l-2.34.57v-1.38l-1.17.3v-2.78l-1.17.3v4.13l-2.33.58-.03-11.04v-2.77l2.33-.57Zm1.2 2.47v1.39l-1.2.3v2.77l1.17-.3v-1.39l1.17-.3v-2.77l-1.14.3Zm5.15-4.1.99-.24v1.38l.99-.24v1.39l.99-.24v1.39l.99-.25v-1.38l.98-.24v-1.39l1-.24v-1.39l.98-.24v13.8l-1.98.5-.03-8.3-.98.24v1.39l-1.98.48v-1.39l-.99.25.06 8.29-1.98.54-.03-12.48 1-.24v-1.4Zm7.55-1.81 1.17-.3v1.33l2.19-.49v1.39l1.13-.27v1.36l1.14-.28v-1.38l1.14-.27v-1.4l1.14-.26v-1.33l1.14-.21v4.01l-1.14.27v1.39l-1.14.27v1.39l-1.14.27v1.39l1.14-.28v1.39l1.14-.27v1.39l1.14-.28v2.78l-2.25.57v-1.39l-1.14.28v-1.42l-1.13.27-.13.03-1.01.21v1.42l-.03 1.38-1.11.28-2.22.54v-2.77l1.08-.28v-1.38l1.14-.27v-1.4l1.14-.26v-2.75l-1.14.28v-1.4l-2.22.55v-2.77l-.03-1.33Z"/></g><path fill="#E5E5E5" stroke="#2C2C43" stroke-width="3" d="M317.25 165.19v-1.5h-4.4V146.5h78.8v6.45H398v6.93h6.85v10.62h-87.6v-5.31Z"/><path fill="#2C2C43" d="M364 152h18v3h-18zm-5 0h3v3h-3z"/><path fill="#E5E5E5" stroke="#2C2C43" stroke-width="3" d="M320.3 136.52v-1.5h-8.8V84.19h8.8V79.5h71.35v12.22h6.85v48.73h-6.85v6.05H320.3v-9.98Z"/><path fill="#000" stroke="#2C2C43" stroke-width="3" d="M385.5 135.5h-54v-43h54v43Z"/><path fill="#00F720" d="M333 94h51v.5h-51V94Zm0 .8h51v.5h-51v-.5Zm0 .8h51v.5h-51v-.5Zm0 .8h51v.5h-51v-.5Zm0 .8h51v.5h-51v-.5Zm0 .8h51v.5h-51V98Zm0 .8h51v.5h-51v-.5Zm0 .8h51v.5h-51v-.5Zm0 .8h51v.5h-51v-.5Zm0 .8h51v.5h-51v-.5Zm0 .8h51v.5h-51v-.5Zm0 .8h51v.5h-51v-.5Zm0 .8h51v.5h-51v-.5Zm0 .8h51v.5h-51v-.5Zm0 .8h51v.5h-51v-.5Zm0 .8h51v.5h-51v-.5Zm0 .8h51v.5h-51v-.5Zm0 .8h51v.5h-51v-.5Zm0 .8h51v.5h-51v-.5Zm0 .8h51v.5h-51v-.5Zm0 .8h51v.5h-51v-.5Zm0 .8h51v.5h-51v-.5Zm0 .8h51v.5h-51v-.5Zm0 .8h51v.5h-51v-.5Zm0 .8h51v.5h-51v-.5Zm0 .8h51v.5h-51v-.5Zm0 .8h51v.5h-51v-.5Zm0 .8h51v.5h-51v-.5Zm0 .8h51v.5h-51v-.5Zm0 .8h51v.5h-51v-.5Zm0 .8h51v.5h-51v-.5Zm0 .8h51v.5h-51v-.5Zm0 .8h51v.5h-51v-.5Zm0 .8h51v.5h-51v-.5Zm0 .8h51v.5h-51v-.5Zm0 .8h51v.5h-51v-.5Zm0 .8h51v.5h-51v-.5Zm0 .8h51v.5h-51v-.5Zm0 .8h51v.5h-51v-.5Zm0 .8h51v.5h-51v-.5Zm0 .8h51v.5h-51v-.5Zm0 .8h51v.5h-51v-.5Zm0 .8h51v.5h-51v-.5Zm0 .8h51v.5h-51v-.5Zm0 .8h51v.5h-51v-.5Zm0 .8h51v.5h-51v-.5Zm0 .8h51v.5h-51v-.5Zm0 .8h51v.5h-51v-.5Zm0 .8h51v.5h-51v-.5Zm0 .8h51v.5h-51v-.5Z"/><path fill="#00F" d="M294 200h98v4h-98zm75-4h16v4h-16zm-16-4h16v4h-16zm-14-4h14v4h-14zm6-16h16v4h-16zm16 4h16v4h-16zm16 4h16v4h-16zm-54 4h70v4h-70z"/><use xlink:href="#b"/><use xlink:href="#b"/><use xlink:href="#b"/><path fill="#000068" d="M294 204h98v4h-98zm59-8h16v4h-16z"/><use xlink:href="#c"/><use xlink:href="#c"/><path fill="#000068" d="M353 196h16v4h-16zm-14-4h14v4h-14z"/><use xlink:href="#d"/><use xlink:href="#d"/><path fill="#000068" d="M339 192h14v4h-14zm-16-4h16v4h-16z"/><use xlink:href="#e"/><use xlink:href="#e"/><path fill="#000068" d="M323 188h16v4h-16zm38-8h16v4h-16z"/><use xlink:href="#f"/><use xlink:href="#f"/><path fill="#000068" d="M361 180h16v4h-16zm-16-4h16v4h-16z"/><use xlink:href="#g"/><use xlink:href="#g"/><path fill="#000068" d="M345 176h16v4h-16zm8 12h40v4h-40z"/><use xlink:href="#h"/><use xlink:href="#h"/><use xlink:href="#h"/><defs><clipPath id="a"><path fill="#fff" d="M0 0h40v40H0z" transform="translate(230 145)"/></clipPath></defs></svg>'));
    }
}
