import React from 'react';

class ExampleWork extends React.Component {

    constructor() {
        super();
        this.state = {
            kjcHelloLambdaResponse: "empty"
        }
    }

    getUserAccessToken() {
        let urlparameter = "No UserAccess Token.  You are not logged in.";

        if (window.location.href.indexOf("access_token") > -1) {
            urlparameter = getUrlVars()["access_token"];
        }

        document.getElementById("accessToken").innerHTML = urlparameter;

    }

    invokeLambda(evt) {
        var xhttp = new XMLHttpRequest();

        xhttp.open("GET", "https://y0ltqydnd7.execute-api.us-east-1.amazonaws.com/prod/KJCWebSiteHello", true);

        xhttp.onreadystatechange = function() {
            if (xhttp.readyState == 4 && xhttp.status == 200) {
                document.getElementById("lambdaResponse").innerHTML = xhttp.responseText;
                this.setState({ kjcHelloLambdaResponse: xhttp.responseText })
            }
        }.bind(this);
        console.log("kjcHelloLambdaResponse:" + this.state.kjcHelloLambdaResponse)

        xhttp.send();
    }

    getUrlVars() {
        let vars = {};
        let parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m, key, value) {
            vars[key] = value;
        });
        return vars;
    }

    getSpaceXLaunchHistory() {
        document.getElementById("spaceXLaunchHistory").innerHTML = "Under Development";
    }



    ender() {
      return (
        <section>

        <center>
          <h1>WebSite for Prototyping and Exploring Technologies </h1>
        </center>

        <br></br>

        <h2>Simple WebSite via AWS Infra and React: <a href="https://www.kennethjcartwright.org/KennethJCartwrightResume.pdf">Resume</a></h2>

        <h3 style={{"paddingLeft" : "30px"}}>Implemented Using:</h3>
        <ul>
          <li>AWS Route53 for DomainName and DNS Resolution</li>
          <li>AWS Certificate Manager for SSL Cert</li>
          <li>AWS S3 for Deployment Artifacts and WebSite Origin</li>
          <li>AWS CloudFront for WebSite SSL Termination and CDN Edge Cache</li>
          <li>AWS CodeBuild, CodePipeline, GitHub, Lambda for CI/CD</li>
          <li>AWS IAM Roles and Policies for Priv Mgmt</li>
          <li>React, Babel, NPM, and Webpack for WebSite Impl, Depend Mgmt, Packaging</li>
          <li>Chai Asserts and Mocha for WebSite JavaScript Testing</li>

        </ul>

        <br></br>

        <h2>Simple Serverless Infra via AWS Lambda Function and API Gateway</h2>

        <h3 style={{"paddingLeft" : "30px"}}>Implemented Using:</h3>
        <ul>
          <li>AWS API Gateway for REST API Proxy</li>
          <li>AWS Lambda in Python for Serverless, Scalable Execution Environment</li>
          <li>AWS X-Ray and CloudWatch for Execution Call Tracing</li>

        </ul>

        <div style={{"paddingLeft" : "30px"}}>
          <button style={{"background-color": "green", "cursor":"pointer", "color":"white", "font-size":"80%"}} onClick={this.invokeLambda}>Invoke My AWS Lambda Function</button>
          <p>
            <LambdaFuncMessageBox />
          </p>
        </div>

        <br></br>

        <h2>Website User Identity Provider via AWS Infra: <a href="https://login.kennethjcartwright.org/login?response_type=token&client_id=7albjcj89f331ams0lao796bk7&redirect_uri=https://www.kennethjcartwright.org">Login or Create Account</a></h2>

        <h3 style={{"paddingLeft" : "30px"}}>Implemented Using:</h3>
        <ul>
          <li>AWS Cognito for Identity Provider</li>
          <li>AWS Route53 for DomainName and DNS Resolution</li>
          <li>AWS Certificate Manager for SSL Cert</li>

        </ul>


        <div style={{"paddingLeft" : "30px"}}>
          <button style={{"background-color": "green", "cursor":"pointer", "color":"white", "font-size":"80%"}} onclick={this.getUserAccessToken}>After Logging In, View Your AWS Cognito UserAccess Token for this WebSite</button>
          <p>
            <AccessTokenMessageBox />
          </p>
        </div>

        <br></br>

        <h2>Reading from and Writing to DynamoDB: </h2>

        <h3 style={{"paddingLeft" : "30px"}}>Implemented Using:</h3>
        <ul>
          <li>AWS DynamoDB for Scalable Persistence</li>
          <li>AWS APIGateway for REST API Proxy</li>
          <li>AWS Lambda in Java for Serverless, Scalable Execution </li>
        </ul>

        <div style={{"paddingLeft" : "30px"}}>
          <button style={{"background-color" : "green", "cursor" : "pointer", "color":"white", "font-size":"80%"}} onclick={this.getSpaceXLaunchHistory()}>View SpaceX Launch History</button>
          <p>
            <SpaceXMessageBox />
          </p>
        </div>

        <br></br>

        </section>

      )
    }
  }

  class LambdaFuncMessageBox extends React.Component {
    render() {
      return (
        <span style={{"color" : "orange", "font-family" : "courier"}} id="lambdaResponse"> </span>
      )
    }
  }


  class AccessTokenMessageBox extends React.Component {
    render() {
      console.log("AccessTokenMessageBoxrender");

      return (
        <span style={{"color" : "orange", "font-family" : "courier"}} id="accessToken"> </span>
      )
    }
  }

  class SpaceXMessageBox extends React.Component {
    render() {
      return (
        <span style={{"color" : "orange", "font-family" : "courier"}} id="spaceXLaunchHistory"> </span>
      )
    }
  }

  export default ExampleWork;
