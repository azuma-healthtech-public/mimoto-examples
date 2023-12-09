#import "AppDelegate.h"

#import <React/RCTBundleURLProvider.h>

@implementation AppDelegate

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
  self.moduleName = @"AppAuthCodeExchange";
  // You can add your custom initial props in the dictionary below.
  // They will be passed down to the ViewController used by React Native.
  self.initialProps = @{};
  
  return [super application:application didFinishLaunchingWithOptions:launchOptions];
}

- (BOOL) application: (UIApplication *)application
             openURL: (NSURL *)url
             options: (NSDictionary<UIApplicationOpenURLOptionsKey, id> *) options
{
  if ([self.authorizationFlowManagerDelegate resumeExternalUserAgentFlowWithURL:url]) {
    return YES;
  }
  return [RCTLinkingManager application:application openURL:url options:options];
}

- (BOOL) application: (UIApplication *) application
continueUserActivity: (nonnull NSUserActivity *)userActivity
  restorationHandler: (nonnull void (^)(NSArray<id<UIUserActivityRestoring>> * _Nullable))restorationHandler
{
  // if ([userActivity.activityType isEqualToString:NSUserActivityTypeBrowsingWeb]) {
  
  NSString* path = userActivity.webpageURL.path;
  if([path isEqual: @"/code/ce"]){
    
    // code exchange
    NSLog(@"Code exchange");
    NSLog(@"%@", userActivity.webpageURL.absoluteString);
    
    // FIXME: start screen with progress
    
    NSString *url = @"https://mimoto-test.pie.azuma-health.tech/oidcf/exchange/mobile";
    NSDictionary *jsonBodyDict = @{@"redirectUrl":userActivity.webpageURL.absoluteString, @"clientId":@"b664b9ab-1484-4228-b546-7b173a860f44"};
    NSData *jsonBodyData = [NSJSONSerialization dataWithJSONObject:jsonBodyDict options:kNilOptions error:nil];
    // watch out: error is nil here, but you never do that in production code. Do proper checks!
    
    NSMutableURLRequest *request = [NSMutableURLRequest new];
    request.HTTPMethod = @"POST";
    [request setURL:[NSURL URLWithString:url]];
    [request setValue:@"application/json" forHTTPHeaderField:@"Content-Type"];
    [request setValue:@"application/json" forHTTPHeaderField:@"Accept"];
    [request setHTTPBody:jsonBodyData];
    
    NSURLSessionConfiguration *config = [NSURLSessionConfiguration defaultSessionConfiguration];
    NSURLSession *session = [NSURLSession sessionWithConfiguration:config delegate:nil delegateQueue:[NSOperationQueue mainQueue]];
    NSURLSessionDataTask *task = [session dataTaskWithRequest:request
                                            completionHandler:^(NSData * _Nullable data,
                                                                NSURLResponse * _Nullable response,
                                                                NSError * _Nullable error) {
      NSLog(@"Exchange finished");
      
      NSHTTPURLResponse *asHTTPResponse = (NSHTTPURLResponse *) response;
      NSLog(@"The response is: %@", asHTTPResponse);
      
      NSDictionary *forJSONObject = [NSJSONSerialization JSONObjectWithData:data options:kNilOptions error:nil];
      NSString* redirectUrl = [forJSONObject valueForKey:@"redirectUrl"];
      
      NSLog(@"Redirect url");
      NSLog(@"%@", redirectUrl);
      
      // app auth
      if (self.authorizationFlowManagerDelegate) {
        [self.authorizationFlowManagerDelegate resumeExternalUserAgentFlowWithURL:[NSURL URLWithString:redirectUrl]];
      }
      
    }];
    [task resume];
    
    return YES;
  }
  
  // app auth
  if([path isEqual: @"/app/ce"]){
    if (self.authorizationFlowManagerDelegate) {
      NSLog(@"%@", userActivity.webpageURL.absoluteString);
      BOOL resumableAuth = [self.authorizationFlowManagerDelegate resumeExternalUserAgentFlowWithURL:userActivity.webpageURL];
      if (resumableAuth) {
        return YES;
      }
    }
  }
  
  //}
  return [RCTLinkingManager application:application continueUserActivity:userActivity restorationHandler:restorationHandler];
}

- (NSURL *)sourceURLForBridge:(RCTBridge *)bridge
{
#if DEBUG
  return [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index"];
#else
  return [[NSBundle mainBundle] URLForResource:@"main" withExtension:@"jsbundle"];
#endif
}

@end
