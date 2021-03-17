module.exports = {
    rules: [
        {
            test: /\.(glsl|frag|vert)$/,
            exclude: /node_modules/,
            use: [
                'raw-loader',
                {
                    loader: 'glslify-loader',
                    options: {
                        transform: [
                            ['glslify-hex', { 'option-1': true, 'option-2': 42 }]
                        ]
                    }
                }
            ]
        }
    ]
}