//
//  ViewController.m
//  Test1
//
//  Created by user251243 on 12/10/23.
//

#import "ViewController.h"

@interface ViewController ()

@end

@implementation ViewController

@synthesize deepLink;
@synthesize authorizationFlowManagerDelegate;
@synthesize rootViewController;


- (void)viewDidLoad {
  [super viewDidLoad];
  
  
  NSLog(@"Code exchange in screen");
  NSLog(@"%@", deepLink);
  
  NSString *url = @"https://mimoto-test.pie.azuma-health.tech/oidcf/exchange/mobile";
  NSDictionary *jsonBodyDict = @{@"redirectUrl":deepLink, @"clientId":@"b664b9ab-1484-4228-b546-7b173a860f44"};
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
      NSLog(@"Continue in app auth");
      [self.authorizationFlowManagerDelegate resumeExternalUserAgentFlowWithURL:[NSURL URLWithString:redirectUrl]];
      [self.view removeFromSuperview];
    }
  }];
  [task resume];
}

@end
