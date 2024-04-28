import React, { useState, useEffect, useRef } from 'react';
import { Loader } from "@googlemaps/js-api-loader";

function RFU() {
  const [userLocation, setUserLocation] = useState(null);
  const [weatherData, setWeatherData] = useState(null);
  const [recommendations, setRecommendations] = useState([]);
  const [dateTime, setDateTime] = useState(new Date());


  // Function to get user's current location
  const getUserLocation = () => {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          // Call the reverse geocoding function with latitude and longitude
          reverseGeocode(latitude, longitude)
            .then((address) => {
              resolve({ latitude, longitude, address });
            })
            .catch((error) => {
              reject(error);
            });
        },
        (error) => {
          reject(error);
        }
      );
    });
  };

  // Function to perform reverse geocoding
  const reverseGeocode = (latitude, longitude) => {
    // Use Google Maps Geocoding API to perform reverse geocoding
    const apiKey = 'Google Maps API key'; 
    const apiUrl = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${apiKey}`;

    return fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        if (data.results && data.results.length > 0) {
          return data.results[0].formatted_address;
        } else {
          throw new Error('No address found for the given coordinates');
        }
      });
  };

  const fetchWeatherData = (latitude, longitude) => {
    const apiKeyW = '/open weather api'; //open weather api
    const apiUrlW = `https://api.openweathermap.org/data/3.0/onecall?lat=${latitude}&lon=${longitude}&exclude=minutely&appid=${apiKeyW}&units=metric`;
  
    fetch(apiUrlW)
      .then((response) => response.json())
      .then((data) => {
        setWeatherData(data);
      })
      .catch((error) => {
        console.error('Error fetching weather data:', error);
      });
  };
  
  const fetchEvents = async (category) => {
    try {
      const apiKey = 'Ticketmaster api key'; //Ticketmaster API key
      const apiUrl = `https://app.ticketmaster.com/discovery/v2/events.json?apikey=${apiKey}&size=3&categoryCode=${category}&latlong=${userLocation.latitude},${userLocation.longitude}`;
  
      const response = await fetch(apiUrl);
      const data = await response.json();
      if (data._embedded && data._embedded.events) {
        return data._embedded.events.map(event => ({
          name: event.name,
          date: event.dates.start.localDate,
          time: event.dates.start.localTime,
          address: event._embedded.venues[0].address.line1,
          latitude: event._embedded.venues[0].location.latitude,
          longitude: event._embedded.venues[0].location.longitude
        }));
      } else {
        return [];
      }
    } catch (error) {
      console.error('Error fetching event data:', error);
      return [];
    }
  };

  const fetchRecommendations = async (userLocationAddress, dateTime) => {
    try {
      const apiKeyOAI = 'openai api key'; //openai api
      const apiUrlOAI = 'https://api.openai.com/v1/chat/completions';
  
      const response = await fetch(apiUrlOAI, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKeyOAI}`
        },
        body: JSON.stringify({
          model: 'gpt-3.5-turbo',
          messages: [
            {
              role: 'system',
              content: 'You are a helpful assistant designed to output JSON.'
            },
            {
              role: 'user',
              content: `I would like 3 restaurant recommendations, 3 sports events recommendations, 3 musical events recommendations based on my location: ${userLocationAddress}, present date and time : ${dateTime.toLocaleString()} .
               I want the name, dates, time, address, exact latitude and longitude of the address. I also want the all hours of operations for restaurants. I will give you the naming conventions for the output. Use those naming conventions to give the response.
               Naming Conventions:
               currentLocation, currentDateAndTime, restaurants, musicalEvents, sportsEvents
               for restaurants: name, address, latitude, longitude, hoursOfOperation{}
               for musicalEvents: name, address, latitude, longitude, date, time
               for sportsEvents: name, address, latitude, longitude, date, time`
            }
          ]
        })
      });
  
      if (response.ok) {
        const data = await response.json();
        if (data.choices && data.choices.length > 0) {
          const assistantMessage = data.choices[0].message.content;
          const parsedRecommendations = JSON.parse(assistantMessage);
          console.log(parsedRecommendations);
          setRecommendations(parsedRecommendations);
        }
      } else {
        throw new Error('Failed to fetch recommendations');
      }
    } catch (error) {
      console.error('Error fetching recommendations:', error);
    }
  };


  const mapRef = useRef(null); // Reference to the map

const initMap = (lat, lng) => {
  const map = new window.google.maps.Map(mapRef.current, {
    center: { lat, lng },
    zoom: 12,
  });

  // Place markers for restaurants
  if (recommendations.restaurants) {
    recommendations.restaurants.forEach((restaurant, index) => {
      new window.google.maps.Marker({
        position: { lat: restaurant.latitude, lng: restaurant.longitude },
        map,
        title: `Restaurant ${index + 1}`,
        icon: {
          url: 'http://maps.google.com/mapfiles/ms/icons/restaurant.png', // Google's restaurant icon
          scaledSize: new window.google.maps.Size(30, 30),
        },
      });
    });
  }

  // Place markers for musical events
  if (recommendations.musicalEvents) {
    recommendations.musicalEvents.forEach((event, index) => {
      new window.google.maps.Marker({
        position: { lat: event.latitude, lng: event.longitude },
        map,
        title: `Musical Event ${index + 1}`,
        icon: {
          url: 'http://maps.google.com/mapfiles/ms/icons/picnic.png', // Google's music icon
          scaledSize: new window.google.maps.Size(30, 30),
        },
      });
    });
  }

  // Place markers for sports events
  if (recommendations.sportsEvents) {
    recommendations.sportsEvents.forEach((event, index) => {
      new window.google.maps.Marker({
        position: { lat: event.latitude, lng: event.longitude },
        map,
        title: `Sports Event ${index + 1}`,
        icon: {
          url: 'http://maps.google.com/mapfiles/ms/icons/sportvenue.png', // Google's sports icon
          scaledSize: new window.google.maps.Size(30, 30),
        },
      });
    });
  }

  // Place marker for current user location
  new window.google.maps.Marker({
    position: { lat, lng },
    map,
    title: 'Your Location',
    icon: {
      url: 'http://maps.google.com/mapfiles/ms/icons/green-dot.png', // Google's green dot icon
      scaledSize: new window.google.maps.Size(30, 30),
    },
  });
};

useEffect(() => {
  const loader = new Loader({
    apiKey: 'google maps api key', // Google Maps API key
    version: 'weekly',
  });

  loader.load().then(() => {
    if (userLocation && recommendations) {
      const { latitude, longitude } = userLocation;
      initMap(latitude, longitude);
    }
  });
}, [userLocation, recommendations]);


useEffect(() => {
    if (userLocation) {
      fetchEvents('KZFzniwnSyZfZ7v7nJ').then(events => { // Example category code for music
        setRecommendations(prev => ({ ...prev, musicalEvents: events }));
      });
      fetchEvents('KZFzniwnSyZfZ7v7nE').then(events => { // Example category code for sports
        setRecommendations(prev => ({ ...prev, sportsEvents: events }));
      });
      // Add more categories as needed
    }
  }, [userLocation]);
  

  useEffect(() => {
    const interval = setInterval(() => {
      setDateTime(new Date());
    }, 1000); // Update every second

    // Cleanup interval on component unmount
    return () => clearInterval(interval);
  }, []);



  useEffect(() => {
    getUserLocation()
      .then((location) => {
        setUserLocation(location);
        fetchWeatherData(location.latitude, location.longitude);
        fetchRecommendations(location.address,dateTime);
      })
      .catch((error) => {
        console.error('Error getting user location:', error);
      });
  }, []);

  

  return (
    <div>
      <h2>Recommended for You</h2>
      <p>User Location: {userLocation ? userLocation.address : 'Loading...'}</p>
      <p>Current Date and Time: {recommendations.currentDateAndTime}</p>

      {weatherData && weatherData.current && (
        <div>
          <h3>Current Weather</h3>
          <p>Temperature: {weatherData.current.temp}°C</p>
          <p>Description: {weatherData.current.weather[0].description}</p>
        </div>
      )}

      <h3>Recommendations</h3>
      <ul>
        {/* Restaurants */}
        {recommendations.restaurants && recommendations.restaurants.map((restaurant, index) => (
          <li key={`restaurant-${index}`}>
            <strong>Restaurant:</strong> {restaurant.name}<br/>
            <strong>Hours of Operation:</strong> {Object.entries(restaurant.hoursOfOperation).map(([day, hours]) => `${day}: ${hours}`).join(', ')}<br/>
            <strong>Address:</strong> {restaurant.address}
          </li>
        ))}

        {/* Sports Events */}
        {recommendations.sportsEvents && recommendations.sportsEvents.map((event, index) => (
          <li key={`sports-${index}`}>
            <strong>Sports Event:</strong> {event.name}<br/>
            <strong>Date:</strong> {event.date}<br/>
            <strong>Time:</strong> {event.time}<br/>
            <strong>Address:</strong> {event.address}
          </li>
        ))}

        {/* Musical Events */}
        {recommendations.musicalEvents && recommendations.musicalEvents.map((event, index) => (
          <li key={`musical-${index}`}>
            <strong>Musical Event:</strong> {event.name}<br/>
            <strong>Date:</strong> {event.date}<br/>
            <strong>Time:</strong> {event.time}<br/>
            <strong>Address:</strong> {event.address}
          </li>
        ))}
      </ul>

      {!weatherData && <p>Loading weather data...</p>}
      {!recommendations.restaurants && !recommendations.sportsEvents && !recommendations.musicalEvents && <p>Loading recommendations...</p>}

    <h3>Map</h3>
    <div
      ref={mapRef}
      style={{ height: '400px', width: '100%', marginBottom: '20px' }}
    ></div>

    </div>
  );
}

export default RFU;