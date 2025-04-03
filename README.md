# PD-Phile

<a href="https://render.com/" target="_blank">Visit PD-Phile</a>

PD-Phile is a web application that provides a seamless interface for users to interact with data and services. The frontend is built using Next.js, ensuring a fast and efficient user experience, while the backend is powered by Python Flask, enabling robust API handling and data processing.

## Features

- **Modern UI**: Built with Next.js for a fast and responsive frontend.
- **Backend API**: Powered by Flask for efficient data handling.
- **Seamless Integration**: The frontend and backend communicate effectively to provide a smooth user experience.
- **Deployed on Vercel & Render**: Frontend hosted on Vercel, backend on Render for optimized performance.

## Tech Stack

### Frontend

- <a href="https://nextjs.org/" target="_blank">Next.js</a>
- React
- Tailwind CSS (if applicable)

### Backend

- <a href="https://flask.palletsprojects.com/" target="_blank">Flask</a>
- Python

## Installation & Setup

### Prerequisites

Ensure you have the following installed on your system:

- Node.js
- Python 3.x
- pip (Python package manager)

### Clone the Repository

```sh
git clone https://github.com/subhk02/PDphilE.git
cd PDphilE
```

### Frontend Setup

```sh
cd frontend

# Install dependencies
npm install

# Run the development server
npm run dev
```

Frontend will be available at `http://localhost:3000/`.

### Backend Setup

```sh
cd backend

# Create a virtual environment
python -m venv venv
source venv/bin/activate  # On Windows use `venv\Scripts\activate`

# Install dependencies
pip install -r requirements.txt

# Run the Flask server
python app.py
```

Backend will be available at `http://localhost:5000/`.

## Deployment

### Frontend

- The frontend is deployed using Vercel. To deploy manually:
  ```sh
  vercel
  ```

### Backend

- The backend is deployed using Render. To deploy:
  1. Create an account on <a href="https://render.com/" target="_blank">Render</a>.
  2. Create a new web service and connect your GitHub repository.
  3. Set the build command to `pip install -r requirements.txt`.
  4. Set the start command to `gunicorn app:app`.
  5. Deploy the service.

## Contributing

Feel free to fork this repository and submit pull requests with improvements and bug fixes.

## License

This project is licensed under the MIT License.

## Contact

For any issues or queries, feel free to reach out:

- GitHub: <a href="https://github.com/subhk02" target="_blank">subhk02</a>
- Email: <a href="mailto:subhampatro9122@gmail.com">subhampatro9122@gmail.com</a>

