const initialBoxShadow =
  '0px 2px 4px -1px rgb(0 0 0 / 20%), 0px 4px 5px 0px rgb(0 0 0 / 14%), 0px 1px 10px 0px rgb(0 0 0 / 12%)'
const elevatedBoxShadow =
  '0px 8px 4px -1px rgb(0 0 0 / 20%), 0px 8px 5px 0px rgb(0 0 0 / 14%), 0px 1px 10px 0px rgb(0 0 0 / 12%)'

export const getHoverObj = (isCardsVisible: boolean) => ({
  boxShadow: isCardsVisible ? initialBoxShadow : elevatedBoxShadow,
  background: isCardsVisible ? '#afafaf' : 'rgb(199, 226, 250)',
  position: 'relative',
  top: isCardsVisible ? '0' : '-5px',
  transform: isCardsVisible ? 'none' : 'rotate(-2deg)',
})

export const voteCard = (isCardsVisible: boolean) => ({
  textAlign: 'center',
  color: '#3f3f3f',
  height: 60,
  width: 40,
  lineHeight: '60px',
  transition: '0.3s all ease-in',
  cursor: isCardsVisible ? 'not-allowed' : 'pointer',
  '&:hover': getHoverObj(isCardsVisible),
  backgroundColor: !isCardsVisible ? 'background.default' : '#afafaf',
})
