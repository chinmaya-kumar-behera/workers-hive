import { getSearchService } from "../services/searchService";

const SearchHandler = () => {
  const getSearchHandler = async (data) => {
    return getSearchService(data);
  };
  return { getSearchHandler };
};

export default SearchHandler;
