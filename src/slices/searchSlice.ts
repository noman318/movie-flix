import { createSlice, PayloadAction } from "@reduxjs/toolkit";
interface ISearchState {
  term: string | null;
}
const initialState: ISearchState = {
  term: null,
};

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setSearchTerm: (state, action: PayloadAction<string | null>) => {
      state.term = action.payload;
    },
  },
});

export const { setSearchTerm } = searchSlice.actions;

export default searchSlice.reducer;
