import React from 'react';

class ExampleWork extends React.Component {

    constructor() {
        super();
        this.state = { }
        this.render = this.render.bind(this);
    }

    render() {
      return (
        <div>
          <center>
            <h1>WebSite for Prototyping and Exploring Technologies</h1>

          </center>
          <br></br>

          <WebSitePrototype />
          <br></br>
          <LambdaAPIGatewayPrototype  />
          <br></br>
          <CognitoIdentityProviderPrototype  />
          <br></br>
          <DynamoDBPrototype  />
          <br></br>

        </div>
      )
    }
  }

  class WebSitePrototype extends React.Component {
    render() {
      return (

        <div>
          <h2>Simple React WebSite via AWS Infra: <a href="https://www.kennethjcartwright.org/KennethJCartwrightResume.pdf">Resume</a></h2>

          <h3 style={{"paddingLeft":"30px"}}>Implemented Using:</h3>
          <ul>
            <li>AWS Route 53 for Domain Name and DNS Resolution</li>
            <li>AWS Certificate Manager for SSL Cert</li>
            <li>AWS S3 for Deployment Artifacts and WebSite Origin</li>
            <li>AWS CloudFront for WebSite SSL Termination and CDN Edge Cache</li>
            <li>AWS CodeBuild, CodePipeline, GitHub, and Lambda for CI/CD</li>
            <li>AWS IAM Roles and Policies for Priv Management</li>
            <li>React, Babel, NPM, and Webpack for WebSite Impl, Depend Mgmt, and Packaging</li>
            <li>Chai Asserts and Mocha for WebSite JavaScript Testing</li>
          </ul>
        </div>

      )
    }
  }

  class LambdaAPIGatewayPrototype extends React.Component {

    constructor() {
        super();
        this.state = { }

        this.invokeLambda = this.invokeLambda.bind(this);
        this.render = this.render.bind(this);
    }

    invokeLambda(evt) {
        var xhttp = new XMLHttpRequest();
        let resp;

        xhttp.open("GET", "https://y0ltqydnd7.execute-api.us-east-1.amazonaws.com/prod/KJCWebSiteHello", true);

        xhttp.onreadystatechange = function() {
            if (xhttp.readyState == 4) {
              if (xhttp.status == 200) {
                resp = xhttp.responseText;
                this.setState({ resp });
              }
              else {
                console.error(xhttp.statusText);
              }
            }
        }.bind(this);

        xhttp.onerror = function (e) {
          console.error(xhttp.statusText);
        };

        xhttp.send();
    }

    render() {
      return (

        <div>
          <h2>Simple Serverless Infra via API Gateway and AWS Lambda Function</h2>

          <h3 style={{"paddingLeft":"30px"}}>Implemented Using:</h3>
          <ul>
            <li>AWS API Gateway for REST API Proxy</li>
            <li>AWS Lambda in Python for Serverless, Scalable Execution Environment</li>
            <li>AWS X-Ray and CloudWatch for Execution Call Tracing</li>
          </ul>

          <div style={{"paddingLeft":"50px"}}>
            <button id="lambdaButton" style={{"backgroundColor":"green", "cursor":"pointer", "color":"white", "fontSize":"100%"}} onClick={this.invokeLambda}>Invoke My AWS Lambda Function</button>
              <KJCMessageBox message={this.state.resp}/>
          </div>
        </div>

      )
    }
  }


  class CognitoIdentityProviderPrototype extends React.Component {

    constructor() {
        super();
        this.state = { }
        this.getUserAccessToken = this.getUserAccessToken.bind(this);
        this.render = this.render.bind(this);
    }

    getUserAccessToken(evt) {
        let urlparameter = "No UserAccess Token.  You are not logged in.";

        if (window.location.href.indexOf("access_token") > -1) {
            urlparameter = this.getUrlVars()["access_token"];
        }

        this.setState({ urlparameter });

        console.log("urlp" + urlparameter);
    }

    getUrlVars() {
        let vars = {};
        let parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m, key, value) {
            vars[key] = value;
        });

        return(vars);
    }

    render() {
      return (

        <div>
          <h2>Website User Identity Provider via AWS Infra: <a href="https://login.kennethjcartwright.org/login?response_type=token&client_id=7albjcj89f331ams0lao796bk7&redirect_uri=https://www.kennethjcartwright.org">Login or Create Account</a></h2>

          <h3 style={{"paddingLeft":"30px"}}>Implemented Using:</h3>
          <ul>
            <li>AWS Cognito for Identity Provider</li>
            <li>AWS Route53 for DomainName and DNS Resolution</li>
            <li>AWS Certificate Manager for SSL Cert</li>
          </ul>

          <div style={{"paddingLeft":"50px"}}>
            <button id="accessTokenButton" style={{"backgroundColor":"green", "cursor":"pointer", "color":"white", "fontSize":"100%"}} onClick={this.getUserAccessToken}>After Logging In, View Your AWS Cognito UserAccess Token for this WebSite</button>
              <KJCMessageBox message={this.state.urlparameter}/>
          </div>
        </div>

      )
    }
  }


  class DynamoDBPrototype extends React.Component {

    constructor() {
        super();
        this.state = { }
        this.getSpaceXLaunchHistory = this.getSpaceXLaunchHistory.bind(this);
        this.render = this.render.bind(this);
    }


    getSpaceXLaunchHistory(evt) {
      let spaceXLaunchHistory = "Under Development";
      this.setState({ spaceXLaunchHistory });
    }

    render() {
      return (

        <div>
          <h2>Reading from and Writing to DynamoDB: </h2>

          <h3 style={{"paddingLeft":"30px"}}>Implemented Using:</h3>
          <ul>
            <li>AWS DynamoDB for Scalable Persistence</li>
            <li>AWS API Gateway for REST API Proxy</li>
            <li>AWS Lambda in Java for Serverless, Scalable Execution Environment</li>
          </ul>

          <div style={{"paddingLeft":"50px"}}>
            <button id="spaceXButton" style={{"backgroundColor":"green", "cursor":"pointer", "color":"white", "fontSize":"100%"}} onClick={this.getSpaceXLaunchHistory}>View SpaceX Launch History</button>
              <KJCMessageBox message={this.state.spaceXLaunchHistory}/>
          </div>
        </div>

      )
    }
  }


  class KJCMessageBox extends React.Component {
    render() {
      return (
        <div style={{"color":"orange", "fontFamily":"courier", "fontSize":"12px"}}>
        <p></p>
          {this.props.message}
        </div>
      )
    }
  }

  export default ExampleWork;
