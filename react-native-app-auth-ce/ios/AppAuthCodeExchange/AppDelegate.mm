#import "AppDelegate.h"

#import <React/RCTBundleURLProvider.h>

#import "ViewController.h"

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
    NSLog(@"Code exchange received");
    NSLog(@"%@", userActivity.webpageURL.absoluteString);
    
    UIStoryboard *sb = [UIStoryboard storyboardWithName:@"ExchangeCodes" bundle:nil];
        
    ViewController *vc = [sb instantiateViewControllerWithIdentifier:@"ViewController"];
    vc.deepLink = userActivity.webpageURL.absoluteString;
    vc.authorizationFlowManagerDelegate = self.authorizationFlowManagerDelegate;
    [self.window addSubview:vc.view];
    NSLog(@"Started view");
    
    return YES;
  }
  
  // app auth
  if([path isEqual: @"/app/ce"]){
    if (self.authorizationFlowManagerDelegate) {
      NSLog(@"App code exchange received");
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
