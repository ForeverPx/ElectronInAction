#include "demo.h"
#include <napi.h>

int sum(int size)
{
    int i;
    int result = 0;
    for(i=0;i<size;i++){
         result += i;
    }
    return result;
}

Napi::Number SumWrapped(const Napi::CallbackInfo& info) {
    Napi::Env env = info.Env();
    if (info.Length() < 1 || !info[0].IsNumber() ) {
        Napi::TypeError::New(env, "Number expected").ThrowAsJavaScriptException();
    }
    Napi::Number first = info[0].As<Napi::Number>();

    int returnValue = sum(first.Int32Value());
    
    return Napi::Number::New(env, returnValue);
}


Napi::Object Init(Napi::Env env, Napi::Object exports) {
    exports.Set("sum", Napi::Function::New(env, SumWrapped));
    return exports;
}

NODE_API_MODULE(NODE_GYP_MODULE_NAME, Init);