import React from 'react';

const CampusMap = () => (
  <div>
    <h2 className="mb-4">Campus Map Tour</h2>
    <div className="ratio ratio-16x9 mb-4">
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3065.821064131359!2d-93.6427795843916!3d42.02651397918652!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x87e6553e058594db%3A0x1a4a63a4c5279696!2sIowa%20State%20University!5e0!3m2!1sen!2sus!4v1714578431824!5m2!1sen!2sus"
        style={{ border: 0 }}
        allowFullScreen=""
        loading="lazy"
      ></iframe>
    </div>
    <p>
      Explore the ISU campus by zooming and panning the map above.
    </p>
  </div>
);

export default CampusMap;
