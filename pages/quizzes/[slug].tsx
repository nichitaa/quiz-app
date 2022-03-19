const Quiz = ({ slug }: { slug: any }) => {
  console.log('Game slug: ', slug);
  return (
    <p>single game</p>
  );
};

// export const getStaticPaths = async () => {
//
//   const accessTokenResponse = await fetch('https://pure-caverns-82881.herokuapp.com/api/developers/v72/tokens', {
//     method: 'POST',
//     headers: {
//       'X-Developer-Key': '15b50095c9a5d0d8787ae19f03c5db840428997fa1e220d22900762362cffdf4',
//       'X-Developer-Secret': '9f2da0e705273f49b622258dbb529061453f0cc30f9f851fdfa3c824c69d1197'
//     }
//   }).then(res => res.json())
//
//   console.log({accessTokenResponse});
//
//   const accessToken = accessTokenResponse.token;
//   console.log({accessToken});
//
//   const quizesResponse = await fetch('https://pure-caverns-82881.herokuapp.com/api/v54/quizzes', {
//     method: 'GET',
//     headers: {
//       'X-Access-Token': accessToken
//     }
//   }).then(res => res.json())
//
//   console.log({quizesResponse})
//
//   const paths = quizesResponse.map((q) => ({params: {slug: q.id.toString()}}))
//   console.log({paths})
//   return {
//     paths: paths,
//     fallback: false
//   }
//
// }
//
// export const getStaticProps = async ({params}: { params: any }) => {
//   return {
//     props: {
//       slug: params
//     }
//   }
// }

export default Quiz;