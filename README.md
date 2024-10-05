# PostgreSQL Operator Frontend

This project provides a frontend interface for managing PostgreSQL instances deployed via a Kubernetes Operator. The frontend interacts with a backend API, allowing users to create, modify, and monitor PostgreSQL instances within the cluster.

## Table of Contents

- [Overview](#overview)
- [Technologies Used](#technologies-used)
- [Features](#features)
- [Installation](#installation)
  - [Prerequisites](#prerequisites)
  - [Clone the Repository](#clone-the-repository)
  - [Install Dependencies](#install-dependencies)
  - [Environment Variables](#environment-variables)
  - [Running the App](#running-the-app)
    - [Development Mode](#development-mode)
    - [Production Build](#production-build)
  - [Kubernetes Deployment](#kubernetes-deployment)
    - [Create Docker Images](#create-docker-images)
- [Contributing](#contributing)
- [License](#license)

## Overview

The PostgreSQL Operator Frontend is designed to provide a user-friendly interface for managing PostgreSQL databases deployed through a custom Kubernetes Operator. The frontend allows users to interact with the backend API for creating, updating, and deleting PostgreSQL instances running within the cluster.

This project is part of a Kubernetes-based infrastructure where PostgreSQL databases are deployed and managed via a custom Kubernetes Operator.

## Technologies Used

- **Frontend Framework**: React
- **UI Library**: Ant Design
- **State Management**: Context API
- **API Communication**: Axios
- **Routing**: React Router
- **Kubernetes**: For deploying the application
- **Traefik**: Ingress controller for routing traffic within the cluster

## Features

- **Database Management**: Create, resize, and delete PostgreSQL instances.
- **API Integration**: Communicates with the backend API for real-time updates.
- **Responsive Design**: Optimized for both desktop and mobile use.

## Installation

### Prerequisites

Before running this project, ensure you have the following installed:

- Node.js (v14 or higher)
- npm or yarn
- A running instance of the backend API (PostgreSQL Operator)

### Clone the Repository

```bash
git clone https://github.com/ShamimRahimi/PostgreSQL-Operator-Frontend.git
cd PostgreSQL-Operator-Frontend
```
### Install Dependencies

Install the necessary dependencies using npm or yarn:

```bash
npm install
# or
yarn install
```
### Environment Variables

Create a `.env` file in the root directory and set the environment variables required for the application to run.

Example:

```env
REACT_APP_BACKEND_URL=http://your-backend-url.com/api/v1
```
### Running the App

#### Development Mode

To run the app in development mode:

```bash
npm start
# or
yarn start
```
This will start the app at `http://localhost:3000`. The page will reload automatically if you make edits.

#### Production Build

To build the app for production:

```bash
npm run build
# or
yarn build
```
