# Virtual Pandal Backend API

A comprehensive Node.js backend API for a virtual pandal platform that connects devotees with religious service providers including samitis (committees), murtikars (idol makers), pujaris (priests), and kathavachaks (storytellers).

## Features

- **User Management**: Registration, authentication, and profile management for different user roles
- **Pandal Management**: Create and manage virtual pandals with live streaming capabilities
- **Booking System**: Book services from religious service providers
- **Rating & Review System**: Rate and review pandals and service providers
- **Donation System**: Accept donations for pandals
- **Dashboard**: Analytics and statistics for service providers
- **Geospatial Queries**: Find nearby pandals based on location

## User Roles

- **Devotee**: Regular users who can book services and make donations
- **Samiti**: Committee members who manage pandals
- **Murtikar**: Idol makers who provide idol creation services
- **Pujari**: Priests who provide religious services
- **Kathavachak**: Storytellers who provide religious storytelling services
- **Admin**: Platform administrators

## Tech Stack

- **Node.js** with Express.js
- **MongoDB** with Mongoose ODM
- **JWT** for authentication
- **bcryptjs** for password hashing
- **nodemailer** for email services
- **CORS** for cross-origin requests

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create environment file:
```bash
cp env.example .env
```

4. Update the `.env` file with your configuration:
```env
MONGODB_URI=mongodb://localhost:27017/virtual-pandal
JWT_SECRET=your-super-secret-jwt-key-here
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
PORT=5000
NODE_ENV=development
CORS_ORIGIN=http://localhost:3000
```

5. Start the server:
```bash
# Development mode
npm run dev

# Production mode
npm start
```

## API Endpoints

### Authentication (`/api/auth`)
- `POST /register` - Register a new user
- `POST /verify-otp` - Verify email with OTP
- `POST /login` - User login

### Users (`/api/users`)
- `GET /profile` - Get user profile
- `PUT /profile` - Update user profile
- `PUT /change-password` - Change password
- `GET /stats` - Get user statistics
- `POST /activity` - Update user activity

### Pandals (`/api/pandals`)
- `GET /` - Get all pandals with filters
- `GET /:id` - Get pandal by ID
- `POST /` - Create new pandal (authenticated)
- `PUT /:id` - Update pandal (authenticated)
- `GET /nearby/:lat/:lng` - Get nearby pandals

### Bookings (`/api/bookings`)
- `POST /` - Create a booking
- `GET /user` - Get user's bookings
- `GET /pandal/:pandalId` - Get pandal bookings
- `PUT /:bookingId/status` - Update booking status
- `DELETE /:bookingId` - Cancel booking
- `GET /stats/summary` - Get booking statistics

### Donations (`/api/donations`)
- `POST /` - Create a donation
- `GET /pandal/:pandalId` - Get pandal donations
- `POST /webhook/payment-status` - Update donation status

### Ratings (`/api/ratings`)
- `POST /` - Create/update a rating
- `GET /pandal/:pandalId` - Get pandal ratings
- `GET /user` - Get user's ratings
- `DELETE /:ratingId` - Delete a rating

### Dashboard (`/api/dashboard`)
- `GET /stats` - Get dashboard statistics
- `GET /bookings` - Get recent bookings
- `GET /earnings` - Get earnings data
- `GET /reviews` - Get recent reviews

### Profiles (`/api/profiles`)
- `GET /` - Get all service provider profiles
- `GET /:id` - Get specific profile
- `POST /:id/rate` - Rate a profile
- `POST /:id/follow` - Follow/unfollow a profile
- `PUT /me` - Update own profile

## Database Models

### User
- Basic user information with role-based profiles
- Support for different service provider types
- Business metrics and ratings

### Pandal
- Pandal information with location data
- Live streaming capabilities
- Event management
- Visitor and donation tracking

### Booking
- Service booking system
- Pricing and payment tracking
- Status management
- Communication system

### Donation
- Donation tracking
- Platform fee calculation
- Payment status management

### Rating
- Universal rating system for users and pandals
- Review management
- Rating statistics

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `MONGODB_URI` | MongoDB connection string | `mongodb://localhost:27017/virtual-pandal` |
| `JWT_SECRET` | JWT secret key | Required |
| `EMAIL_USER` | Email service username | Required |
| `EMAIL_PASS` | Email service password | Required |
| `PORT` | Server port | `5000` |
| `NODE_ENV` | Environment mode | `development` |
| `CORS_ORIGIN` | CORS allowed origin | `http://localhost:3000` |

## Error Handling

The API uses consistent error response format:
```json
{
  "success": false,
  "message": "Error description",
  "error": "Detailed error message (development only)"
}
```

## Security Features

- Password hashing with bcryptjs
- JWT-based authentication
- Input validation and sanitization
- CORS protection
- Rate limiting (can be added)

## Development

1. Install nodemon for development:
```bash
npm install -g nodemon
```

2. Run in development mode:
```bash
npm run dev
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the ISC License.
