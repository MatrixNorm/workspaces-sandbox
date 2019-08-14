import {
  QueryRenderer, 
  graphql} from 'react-relay'
import environment from './Environement'
import Post from './Post'

const PostQuery = graphql`
  query PostQuery {
    post {
      ...Post_post
    }
  }
`

const App = () => {
  return (
    <QueryRenderer
      query = {PostQuery},
      environment = {environment},
      variables={{}},
      render= {({error, props}) => {
        if (error) {
          return <div>Error: {error}</div>;
        }
        if (!props) {
          return <div>Loading...</div>
        }
        return <Post post={props.post} />
      }}
    />
  )
}