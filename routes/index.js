module.exports = function( make, makeEndpoint, personaSSO, loginAPI ){
  return {
    api: {
      healthcheck: require( "./api/healthcheck" )
    },
    details: require( "./details" )( make ),
    me: require("./me")( make, makeEndpoint, personaSSO, loginAPI ),
    page: function( view ) {
      return require( "./page" )( view, makeEndpoint, personaSSO, loginAPI );
    },
    remove: require( "./remove" )( make ),
    search: require( "./search" )( make, makeEndpoint, personaSSO, loginAPI ),
    tag: function( req, res ) {
      res.redirect( "/search?type=tags&q=" + req.params.tag );
    },
    user: function( req, res ) {
      res.redirect( "/search?type=user&q=" + req.params.user );
    },
    includejs: function( hostname ) {
      return function( req, res ) {
        res.set( "Content-Type", "application/javascript;charset=utf-8" );
        res.render( "sso/include.js", {
          HOSTNAME: hostname
        });
      };
    }
  };
};