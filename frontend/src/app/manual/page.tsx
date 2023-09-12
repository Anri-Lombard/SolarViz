"use client"

import React from 'react';
import '../styles/Manual.css';

export default function Manual() {

  const handleScroll = (event: React.MouseEvent, sectionId: string, offset = -110) => {
    event.preventDefault();
    const element = document.getElementById(sectionId);
    if (element) {
      const position = element.offsetTop + offset;
      window.scrollTo({
        top: position,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className='manualContainer'>
      <div className='tableOfContents'>
        <h2 className='text-xl font-bold mb-4'>Table of Contents</h2>
        <a href='#about' className='text-blue-500 hover:underline mb-2' onClick={(e) => handleScroll(e, 'about')}>About</a>
        <a href='#moreData' className='text-blue-500 hover:underline mb-2' onClick={(e) => handleScroll(e, 'moreData')}>More Data</a>
        <a href='#administration' className='text-blue-500 hover:underline mb-2' onClick={(e) => handleScroll(e, 'administration')}>Administration</a>
        <a href='#contribution' className='text-blue-500 hover:underline mb-2' onClick={(e) => handleScroll(e, 'contribution')}>Contribution</a>
      </div>

      <div className='content'>

        <div id='about'>
          <h4>About</h4>
          <p className='mb-4'>
            <h2>SolarViz: Powering Sustainability at UCT D-Skool</h2>
            <h3>Introduction</h3>
            <p>SolarViz is an innovative dashboard designed to monitor and visualize the power and water usage of the UCT D-Skool building. As a part of the university's commitment to sustainability, the D-Skool building aims to maintain its 6-star green rating. SolarViz plays a crucial role in achieving this goal by providing real-time insights and actionable data.</p>
            <h3>1. Visualization of Power Usage</h3>
            <ul>
              <li><strong>Real-Time Monitoring</strong>: SolarViz offers a live view of the building's energy consumption, breaking down the usage by floors, rooms, and individual appliances. This granular view helps in identifying energy-hungry areas and devices.</li>
              <li><strong>Historical Data Analysis</strong>: Users can access historical data to analyze trends and patterns in energy consumption. This feature assists in forecasting future energy needs and planning accordingly.</li>
              <li><strong>Renewable Energy Integration</strong>: SolarViz integrates data from solar panels and other renewable energy sources, showcasing how much energy is being generated and consumed from sustainable sources.</li>
              <li><strong>Energy Efficiency Recommendations</strong>: The dashboard provides personalized recommendations to reduce energy consumption, such as optimizing lighting and HVAC systems.</li>
            </ul>
            <h3>2. Visualization of Water Usage</h3>
            <ul>
              <li><strong>Water Consumption Tracking</strong>: SolarViz monitors water usage throughout the building, including restrooms, kitchens, and outdoor irrigation systems. This tracking helps in detecting leaks and overuse.</li>
              <li><strong>Water Recycling Insights</strong>: The dashboard displays information about water recycling and rainwater harvesting, contributing to the building's water conservation efforts.</li>
              <li><strong>Water Efficiency Goals</strong>: Users can set and track water-saving goals, encouraging responsible water usage across the building.</li>
            </ul>
            <h3>3. Collaboration with Building Management Systems</h3>
            <ul>
              <li><strong>Integration with Building Controls</strong>: SolarViz seamlessly integrates with existing building management systems, allowing facility managers to control and optimize energy and water usage directly from the dashboard.</li>
              <li><strong>Alerts and Notifications</strong>: The system sends alerts for unusual consumption patterns or system malfunctions, enabling quick response and minimizing waste.</li>
              <li><strong>Customizable Reports</strong>: Facility managers can generate customized reports for different stakeholders, ensuring that everyone is aligned with the building's sustainability goals.</li>
            </ul>
            <h3>4. User Engagement and Education</h3>
            <ul>
              <li><strong>Interactive Interface</strong>: SolarViz offers an engaging and user-friendly interface that encourages occupants to explore and understand their impact on the building's sustainability.</li>
              <li><strong>Educational Content</strong>: The dashboard includes educational materials about green practices and how individual actions contribute to the building's 6-star rating.</li>
              <li><strong>Community Engagement</strong>: SolarViz fosters a sense of community by allowing users to share achievements and challenges, promoting a collective effort towards sustainability.</li>
            </ul>
            <h3>Conclusion</h3>
            <p>SolarViz is more than just a monitoring tool; it's a comprehensive platform that empowers the UCT D-Skool building to stay at the forefront of sustainability. By visualizing power and water usage, integrating with building systems, and engaging users, SolarViz ensures that the D-Skool building continues to be a beacon of environmental responsibility.</p>
            <p>By utilizing SolarViz, the UCT D-Skool building not only maintains its prestigious 6-star green rating but also sets a standard for sustainable practices that can inspire other institutions. It's a step towards a greener future, where technology and awareness go hand in hand to create a sustainable and responsible environment.</p>
          </p>
        </div>
        <div id='moreData'>
          <h4>More data</h4>
          <p className='mb-4'>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia odio vitae vestibulum. Donec in efficitur leo. In hac habitasse platea dictumst. Sed ullamcorper, nunc et pellentesque facilisis, sapien nisl egestas diam, nec blandit elit metus ac erat. Fusce non bibendum dui. Vivamus commodo, sem et sollicitudin malesuada, est quam ultrices orci, a semper augue mauris ut quam.

            Phasellus finibus, mauris a efficitur aliquet, nulla massa venenatis nisl, id efficitur orci nunc at nulla. Proin non bibendum metus. Aenean non convallis odio. Sed fringilla, ex in ultricies cursus, ipsum dolor interdum nulla, ut commodo sapien nisi quis est. Integer nec odio praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet.

            Duis sagittis ipsum. Praesent mauris. Fusce nec tellus sed augue semper porta. Mauris massa. Vestibulum lacinia arcu eget nulla. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Curabitur sodales ligula in libero. Sed dignissim lacinia nunc. Curabitur tortor. Pellentesque nibh. Aenean quam. In scelerisque sem at dolor.

            Maecenas mattis. Sed convallis tristique sem. Proin ut ligula vel nunc egestas porttitor. Morbi lectus risus, iaculis vel, suscipit quis, luctus non, massa. Fusce ac turpis quis ligula lacinia aliquet. Mauris ipsum. Nulla metus metus, ullamcorper vel, tincidunt sed, euismod in, nibh. Quisque volutpat condimentum velit.

            Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Nam nec ante. Sed lacinia, urna non tincidunt mattis, tortor neque adipiscing diam, a cursus ipsum ante quis turpis. Nulla facilisi. Ut fringilla. Suspendisse potenti. Nunc feugiat mi a tellus consequat imperdiet. Vestibulum sapien. Proin quam.

            Etiam ultrices. Suspendisse in justo eu magna luctus suscipit. Sed lectus. Integer euismod lacus luctus magna. Quisque cursus, metus vitae pharetra auctor, sem massa mattis sem, at interdum magna augue eget diam. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Morbi lacinia molestie dui.

            Praesent blandit dolor. Sed non quam. In vel mi sit amet augue congue elementum. Morbi in ipsum sit amet pede facilisis laoreet. Donec lacus nunc, viverra nec, blandit vel, egestas et, augue. Vestibulum tincidunt malesuada tellus. Ut ultrices ultrices enim. Curabitur sit amet mauris. Morbi in dui quis est pulvinar ullamcorper.

            Nulla facilisi. Integer lacinia sollicitudin massa. Cras metus. Sed aliquet risus a tortor. Integer id quam. Morbi mi. Quisque nisl felis, venenatis tristique, dignissim in, ultrices sit amet, augue. Proin sodales libero eget ante. Nulla quam. Aenean laoreet. Vestibulum nisi lectus, commodo ac, facilisis ac, ultricies eu, pede.
          </p>
        </div>
        <div id='administration'>
          <h4>Administration</h4>
          <p className='mb-4'>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia odio vitae vestibulum. Donec in efficitur leo. In hac habitasse platea dictumst. Sed ullamcorper, nunc et pellentesque facilisis, sapien nisl egestas diam, nec blandit elit metus ac erat. Fusce non bibendum dui. Vivamus commodo, sem et sollicitudin malesuada, est quam ultrices orci, a semper augue mauris ut quam.

            Phasellus finibus, mauris a efficitur aliquet, nulla massa venenatis nisl, id efficitur orci nunc at nulla. Proin non bibendum metus. Aenean non convallis odio. Sed fringilla, ex in ultricies cursus, ipsum dolor interdum nulla, ut commodo sapien nisi quis est. Integer nec odio praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet.

            Duis sagittis ipsum. Praesent mauris. Fusce nec tellus sed augue semper porta. Mauris massa. Vestibulum lacinia arcu eget nulla. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Curabitur sodales ligula in libero. Sed dignissim lacinia nunc. Curabitur tortor. Pellentesque nibh. Aenean quam. In scelerisque sem at dolor.

            Maecenas mattis. Sed convallis tristique sem. Proin ut ligula vel nunc egestas porttitor. Morbi lectus risus, iaculis vel, suscipit quis, luctus non, massa. Fusce ac turpis quis ligula lacinia aliquet. Mauris ipsum. Nulla metus metus, ullamcorper vel, tincidunt sed, euismod in, nibh. Quisque volutpat condimentum velit.

            Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Nam nec ante. Sed lacinia, urna non tincidunt mattis, tortor neque adipiscing diam, a cursus ipsum ante quis turpis. Nulla facilisi. Ut fringilla. Suspendisse potenti. Nunc feugiat mi a tellus consequat imperdiet. Vestibulum sapien. Proin quam.

            Etiam ultrices. Suspendisse in justo eu magna luctus suscipit. Sed lectus. Integer euismod lacus luctus magna. Quisque cursus, metus vitae pharetra auctor, sem massa mattis sem, at interdum magna augue eget diam. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Morbi lacinia molestie dui.

            Praesent blandit dolor. Sed non quam. In vel mi sit amet augue congue elementum. Morbi in ipsum sit amet pede facilisis laoreet. Donec lacus nunc, viverra nec, blandit vel, egestas et, augue. Vestibulum tincidunt malesuada tellus. Ut ultrices ultrices enim. Curabitur sit amet mauris. Morbi in dui quis est pulvinar ullamcorper.

            Nulla facilisi. Integer lacinia sollicitudin massa. Cras metus. Sed aliquet risus a tortor. Integer id quam. Morbi mi. Quisque nisl felis, venenatis tristique, dignissim in, ultrices sit amet, augue. Proin sodales libero eget ante. Nulla quam. Aenean laoreet. Vestibulum nisi lectus, commodo ac, facilisis ac, ultricies eu, pede.

            Ut orci risus, accumsan porttitor, cursus quis, aliquet eget, justo. Sed pretium blandit orci. Ut eu diam at pede suscipit sodales. Aenean lectus elit, fermentum non, convallis id, sagittis at, neque. Nullam mauris orci, aliquet et, iaculis et, viverra vitae, ligula. Nulla ut felis in purus aliquam imperdiet. Maecenas aliquet mollis lectus.

            Vivamus consectetuer risus et tortor. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent mauris. Fusce nec tellus sed augue semper porta. Mauris massa. Vestibulum lacinia arcu eget nulla.
          </p>
        </div>
        <div id='contribution'>
          <h4>Contribution</h4>
          <p className='mb-4'>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia odio vitae vestibulum. Donec in efficitur leo. In hac habitasse platea dictumst. Sed ullamcorper, nunc et pellentesque facilisis, sapien nisl egestas diam, nec blandit elit metus ac erat. Fusce non bibendum dui. Vivamus commodo, sem et sollicitudin malesuada, est quam ultrices orci, a semper augue mauris ut quam.

            Phasellus finibus, mauris a efficitur aliquet, nulla massa venenatis nisl, id efficitur orci nunc at nulla. Proin non bibendum metus. Aenean non convallis odio. Sed fringilla, ex in ultricies cursus, ipsum dolor interdum nulla, ut commodo sapien nisi quis est. Integer nec odio praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet.

            Duis sagittis ipsum. Praesent mauris. Fusce nec tellus sed augue semper porta. Mauris massa. Vestibulum lacinia arcu eget nulla. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Curabitur sodales ligula in libero. Sed dignissim lacinia nunc. Curabitur tortor. Pellentesque nibh. Aenean quam. In scelerisque sem at dolor.

            Maecenas mattis. Sed convallis tristique sem. Proin ut ligula vel nunc egestas porttitor. Morbi lectus risus, iaculis vel, suscipit quis, luctus non, massa. Fusce ac turpis quis ligula lacinia aliquet. Mauris ipsum. Nulla metus metus, ullamcorper vel, tincidunt sed, euismod in, nibh. Quisque volutpat condimentum velit.

            Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Nam nec ante. Sed lacinia, urna non tincidunt mattis, tortor neque adipiscing diam, a cursus ipsum ante quis turpis. Nulla facilisi. Ut fringilla. Suspendisse potenti. Nunc feugiat mi a tellus consequat imperdiet. Vestibulum sapien. Proin quam.

            Etiam ultrices. Suspendisse in justo eu magna luctus suscipit. Sed lectus. Integer euismod lacus luctus magna. Quisque cursus, metus vitae pharetra auctor, sem massa mattis sem, at interdum magna augue eget diam. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Morbi lacinia molestie dui.

            Praesent blandit dolor. Sed non quam. In vel mi sit amet augue congue elementum. Morbi in ipsum sit amet pede facilisis laoreet. Donec lacus nunc, viverra nec, blandit vel, egestas et, augue. Vestibulum tincidunt malesuada tellus. Ut ultrices ultrices enim. Curabitur sit amet mauris. Morbi in dui quis est pulvinar ullamcorper.

            Nulla facilisi. Integer lacinia sollicitudin massa. Cras metus. Sed aliquet risus a tortor. Integer id quam. Morbi mi. Quisque nisl felis, venenatis tristique, dignissim in, ultrices sit amet, augue. Proin sodales libero eget ante. Nulla quam. Aenean laoreet. Vestibulum nisi lectus, commodo ac, facilisis ac, ultricies eu, pede.

            Ut orci risus, accumsan porttitor, cursus quis, aliquet eget, justo. Sed pretium blandit orci. Ut eu diam at pede suscipit sodales. Aenean lectus elit, fermentum non, convallis id, sagittis at, neque. Nullam mauris orci, aliquet et, iaculis et, viverra vitae, ligula. Nulla ut felis in purus aliquam imperdiet. Maecenas aliquet mollis lectus.

            Vivamus consectetuer risus et tortor. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent mauris. Fusce nec tellus sed augue semper porta. Mauris massa. Vestibulum lacinia arcu eget nulla.
          </p>
        </div>
      </div>
    </div>
  );
}