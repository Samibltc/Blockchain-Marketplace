export const globalActions = {
  setProducts: (state, action) => {
    state.products = action.payload
  },
  setProduct: (state, action) => {
    state.product = action.payload
  },
  setReviews: (state, action) => {
    state.reviews = action.payload
  },
  setReviewModal: (state, action) => {
    state.reviewModal = action.payload
  },
  setSecurityFee: (state, action) => {
    state.securityFee = action.payload
  },
  setPurchases: (state, action) => {
    state.purchases = action.payload
  },
  setPurchase: (state, action) => {
    state.purchase = action.payload
  },
  setTimestamps: (state, action) => {
    state.timestamps = action.payload
  },
}
