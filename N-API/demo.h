#include <napi.h>

namespace demo {

    int sum(int size);
    Napi::Number AddWrapped(const Napi::CallbackInfo& info);
    Napi::Object Init(Napi::Env env, Napi::Object exports);
}