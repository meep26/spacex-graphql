import React, { Component, Fragment } from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';

import MissionKey from '../Common/MissionKey';
import LaunchItem from './LaunchItem';

const LAUNCHES_QUERY = gql`
   query LaunchesQuery {
      launches {
         flight_number
         mission_name
         launch_date_local
         launch_success
      }
   }
`;

class Launches extends Component {
   render() {
      return (
         <Fragment>
            <h1 className="display-4 my-3">Launches</h1>
            <MissionKey />
            <Query query={LAUNCHES_QUERY}>
               {
                  ({ loading, error, data }) => {
                     if (loading) return <h4>Loading...</h4>
                     if (error) console.log(error);

                     return (
                        data.launches.map(launch => {
                           return <LaunchItem key={launch.flight_number} launch={launch} />
                        })
                     );
                  }
               }
            </Query>
         </Fragment>
      )
   }
}

export default Launches;
