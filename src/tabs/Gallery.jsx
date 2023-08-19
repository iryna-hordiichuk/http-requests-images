import { Component } from 'react';

import * as ImageService from 'service/image-service';
import { Button, SearchForm, Grid, GridItem, Text, CardItem } from 'components';

const IMAGES_PER_PAGE = 15;

export class Gallery extends Component {
  state = {
    images: [],
    query: '',
    page: 1,
    isLoading: false,
    isShown: false,
    isEmpty: false,
  };

  componentDidUpdate(_, prevState) {
    const { query, page } = this.state;
    if (prevState.query !== query || prevState.page !== page) {
      this.getImagesGallery(query, page);
    }
  }

  onSubmit = value => {
    this.setState({
      query: value,
      page: 1,
      images: [],
      isShown: false,
      isEmpty: false,
    });
  };

  getImagesGallery = async (query, page) => {
    if (!query) {
      return;
    }

    this.setState({ isLoading: true });
    const images = await ImageService.getImages(query, page);
    console.log(images);
    if (images.photos.length === 0){
      this.setState({isEmpty: true});
    }
    this.setState(prevState => ({
      images: [...prevState.images, ...images.photos],
      isShown:
        prevState.page < Math.ceil(images.total_results / IMAGES_PER_PAGE),
      isLoading: false,
    }));
  };

  getPage = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  render() {
    const { isEmpty, images, isLoading } = this.state;
    return (
      <>
        <SearchForm onSubmit={this.onSubmit} />
        <Grid>
          {images.map(image => (
            <GridItem key={image.id}>
              <CardItem color={image.avg_color}>
                <img src={image.src.large} alt={image.alt} />
              </CardItem>
            </GridItem>
          ))}
        </Grid>

        {this.state.isShown && (
          <Button onClick={this.getPage}>
            {isLoading ? 'Loading ...' : 'Load More'}
          </Button>
        )}

        { isEmpty && (
          <Text textAlign="center">Sorry. There are no images ... 😭🍕</Text>
        )}
      </>
    );
  }
}
