# Contributing

Thanks for considering contributing to **forgeon-academy**! Here’s how you can help:

## How to Contribute
1. **Fork** the repository
2. **Clone** your fork locally
3. Create a **new branch** for your feature or bug fix
4. Make your changes and **write tests** for them
5. Update the **manifest.yaml** to include your changes
5. **Commit** your changes with a descriptive message
6. Push your changes to your fork and create a **pull request**

## Issues
- If you find a bug or need a feature, please open an **issue**.
- Please search the issue tracker to avoid duplicates.

## Code Style
- Ensure that your code passes existing tests and includes new ones for new features or fixes

## Development Environment
- Use TSX (TypeScript + React) for frontend development

## File Architecture
- `src/` - source code for the frontend application
- `src/components/` - React components used in the application
- `src/core/` - core logic and utilities for the application
- `src/data/` - data files used in the application, all topics and assets
- `src/static/` - static assets like images, fonts, and stylesheets for the application
- `src/vendor/` - third-party libraries and dependencies used in the application


## Testing
Launch web app locally with `python3 -m http.server 8080` and open `http://localhost:8080` in your browser to verify your changes don't break the app, or any other web server of your choice.

## License

By contributing, you agree that your contributions will be licensed under the AGPL License -- see the [LICENSE](LICENSE) file for details.
