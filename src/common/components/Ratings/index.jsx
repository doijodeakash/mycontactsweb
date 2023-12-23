import Ratings from 'react-ratings-declarative'

const StarRatings = ({ rating }) => {
    return (
        <Ratings
            className='d-felx flex-column'
            rating={rating}
            widgetDimensions='15px'
            widgetSpacings='5px'
            // widgetRatedColors="white"
            // changeRating={changeRating}
            disable
        >
            <Ratings.Widget
                widgetDimensions='10px'
                widgetHoverColor='green'
                widgetRatedColor='green'
            />
            <Ratings.Widget
                widgetHoverColor='green'
                widgetDimensions='10px'
                widgetRatedColor='green'
            />
            <Ratings.Widget
                widgetHoverColor='green'
                widgetDimensions='10px'
                widgetRatedColor='green'
            />
            <Ratings.Widget
                widgetHoverColor='green'
                widgetDimensions='10px'
                widgetRatedColor='green'
            />
            <Ratings.Widget
                widgetHoverColor='green'
                widgetDimensions='10px'
                widgetRatedColor='green'
            />

            {/* <Ratings.Widget />
              <Ratings.Widget
                widgetDimension="60px"
                svgIconViewBox="0 0 5 5"
                svgIconPath="M2 1 h1 v1 h1 v1 h-1 v1 h-1 v-1 h-1 v-1 h1 z"
              />
              <Ratings.Widget widgetHoverColor="black" />
              <Ratings.Widget /> */}
        </Ratings>
    )
}

export default StarRatings
