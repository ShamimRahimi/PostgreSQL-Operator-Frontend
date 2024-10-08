# PostgreSQL Operator Frontend

This project provides a frontend interface for managing PostgreSQL instances deployed via a Kubernetes Operator. The frontend interacts with a backend API, allowing users to create, and modify PostgreSQL instances within the cluster.

## Table of Contents

- [Overview](#overview)
- [Technologies Used](#technologies-used)
- [Features](#features)
- [Installation](#installation)
  - [Prerequisites](#prerequisites)
  - [Clone the Repository](#clone-the-repository)
  - [Install Dependencies](#install-dependencies)
  - [Running the App](#running-the-app)

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
cd postgres-k8s-app
```
### Install Dependencies

Install the necessary dependencies using npm or yarn:

```bash
npm install
# or
yarn install
```
### Running the App

To run the app in development mode:

```bash
npm start
# or
yarn start
```
This will start the app at `http://localhost:3000`. The page will reload automatically if you make edits.
