//
//  ViewController.h
//  Test1
//
//  Created by user251243 on 12/10/23.
//

#import <UIKit/UIKit.h>
#import "RNAppAuthAuthorizationFlowManager.h"

@interface ViewController : UIViewController

@property(nullable) id<RNAppAuthAuthorizationFlowManagerDelegate> authorizationFlowManagerDelegate;
@property(nonatomic, nullable, retain) NSString *deepLink;
@property(nonatomic, nullable, retain) UIViewController *rootViewController;

@end

	
