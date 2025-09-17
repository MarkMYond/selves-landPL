const roomEndpoint = {
  path: '/room/:hotelId/:roomId',
  method: 'get' as const,
  handler: async (req: any): Promise<Response> => {
    try {
      // Extract parameters from the URL path
      const url = new URL(req.url, `http://${req.headers.host}`)
      const pathParts = url.pathname.split('/')
      const hotelId = pathParts[3] // /api/room/:hotelId/:roomId
      const roomId = pathParts[4]
      
      if (!hotelId || !roomId) {
        return new Response(
          JSON.stringify({ error: 'Hotel ID and Room ID are required' }),
          {
            status: 400,
            headers: { 'Content-Type': 'application/json' }
          }
        )
      }
      
      // Fetch the hotel
      const hotelResult = await req.payload.find({
        collection: 'hotels',
        where: {
          registryId: {
            equals: hotelId
          }
        }
      })
      
      const hotel = hotelResult.docs[0]
      if (!hotel) {
        return new Response(
          JSON.stringify({ error: 'Hotel not found' }),
          {
            status: 404,
            headers: { 'Content-Type': 'application/json' }
          }
        )
      }
      
      // Find the specific room
      const room = hotel.rooms?.find((r: any) => r.id.toString() === roomId)
      if (!room) {
        return new Response(
          JSON.stringify({ error: 'Room not found' }),
          {
            status: 404,
            headers: { 'Content-Type': 'application/json' }
          }
        )
      }
      
      // Return room first, then hotel context
      return new Response(
        JSON.stringify({
          room,
          hotel
        }),
        {
          status: 200,
          headers: { 'Content-Type': 'application/json' }
        }
      )
    } catch (error) {
      return new Response(
        JSON.stringify({ error: 'Internal server error' }),
        {
          status: 500,
          headers: { 'Content-Type': 'application/json' }
        }
      )
    }
  }
}

export default roomEndpoint
