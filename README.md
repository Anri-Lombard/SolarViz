# SolarViz

SolarViz is a sophisticated web-based dashboard designed to visualize and monitor energy consumption and generation in real-time. Developed in collaboration with the Building Manager of the Hasso Plattner School of Design Thinking Afrika (d-school Afrika), SolarViz aims to promote energy efficiency and sustainability in one of South Africa's first 6-star green-rated education buildings.

## Project Overview

The HPI d-school building is equipped with state-of-the-art green technologies, including solar power, automatic lighting, and energy-efficient heating and cooling systems. SolarViz leverages the power systems' API to provide a user-friendly and interactive interface, allowing building residents and managers to gain insights into electricity usage and generation patterns.

### Key Features

- **Real-Time Visualization:** Display live data on electricity consumption and generation.
- **User-Centric Design:** Developed with a user-centered mindset to meet the specific needs and requirements of building residents.
- **Mobile Responsiveness:** Optimized for viewing on various devices, including mobiles and tablets.
- **Atrium Display:** Featured on the main building screen overlooking the atrium for public viewing.
- **Customization:** Allows users to customize dashboard settings and access detailed usage data.

## Technology Stack

- **Frontend:** Next.js for component organization, type safety, and adherence to SOLID principles.
- **Backend:** Django for view management, URL routing, and data modeling.
- **Database:** SQLite for now, but will be migrated to PostgreSQL for production.
- **API:** Integration with the building's power systems API for real-time data retrieval (still need to be implemented once building purchases API access).

## Getting Started

### Prerequisites

- Node.js
- Python
- Django

### Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/Anri-Lombard/SolarViz.git
    ```

2. Install the required dependencies:

    ```bash
    make install
    ```

    If on a windows machine wsl might be needed to run the make command. If you want to make a virtual environment for python this is the time to do it since make install installs dependenies for both Django and Next.js.

3. Run the development server:

    ```bash
    make server
    ```

4. Run the development client:

    ```bash
    make client
    ```

## Contributing

Contributions are welcome! For major changes, please open an issue first to discuss what you would like to change. Please make sure to update tests as appropriate.

## License

SolarViz is licensed under the [MIT License](./LICENSE).
