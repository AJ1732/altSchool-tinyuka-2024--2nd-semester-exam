"use client";

import { useAuth } from "@/features/auth/context";
import { Check, User, Mail, Calendar, Shield, Key, Clock } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { formatDate, getTimeSince } from "@/utils/date";
import { cn } from "@/lib/utils";

export default function ProfilePage() {
  const dev = false;
  const { user, signOut } = useAuth();

  if (!user) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-center py-8">
          <p className="text-muted-foreground">
            Please sign in to view your profile.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto max-w-4xl px-4 py-8">
      {/* Profile Header */}
      <section className="mb-12 lg:mb-16">
        <header className="flex items-center justify-between gap-4 max-md:flex-col">
          <div className="flex items-center gap-4 max-md:flex-col">
            <div className="bg-avocado-500 grid size-16 place-content-center rounded-full bg-gradient-to-br text-white">
              <User size={32} />
            </div>
            <div className="max-md:text-center">
              <h3 className="text-2xl font-medium">Your Profile</h3>
              <p className="text-muted-foreground">
                Manage your account information and settings
              </p>
            </div>
          </div>
          <Button variant="outline" onClick={signOut}>
            Sign Out
          </Button>
        </header>
      </section>

      <div
        className={cn(
          "gap-8 md:columns-2",
          "[&>div]:my-8 [&>section]:break-inside-avoid [&>section]:space-y-4 [&>section>header>h3]:font-normal",
        )}
      >
        {/* Account Information */}
        <section>
          <header>
            <h3 className="flex items-center gap-2">
              <Mail size={14} />
              Account Information
            </h3>
          </header>
          <dl className="space-y-6">
            <div>
              <dt className="text-muted-foreground mb-1 text-sm font-medium">
                Email Address
              </dt>
              <dd className="flex items-center gap-2">
                <span className="font-medium">{user.email}</span>
                {user.email_confirmed_at && (
                  <Badge
                    variant="secondary"
                    className="border-green-200 bg-green-50 text-green-700"
                  >
                    <Check size={12} className="mr-1" />
                    Verified
                  </Badge>
                )}
              </dd>
            </div>

            <div>
              <dt className="text-muted-foreground mb-1 text-sm font-medium">
                User ID
              </dt>
              <dd className="bg-muted rounded p-2 font-mono text-sm break-all">
                {user.id}
              </dd>
            </div>

            <div>
              <dt className="text-muted-foreground mb-1 text-sm font-medium">
                Account Created
              </dt>
              <dd className="font-medium">{formatDate(user.created_at)}</dd>
            </div>
          </dl>
        </section>

        <Separator />

        {/* Authentication Details */}
        <section>
          <header>
            <h3 className="flex items-center gap-2">
              <Shield size={14} />
              Authentication Details
            </h3>
          </header>
          <dl className="space-y-6">
            <div>
              <dt className="text-muted-foreground mb-1 text-sm font-medium">
                Authentication Method
              </dt>
              <dd>
                <Badge variant="outline" className="capitalize">
                  {user.app_metadata.provider || "Email"}
                </Badge>
              </dd>
            </div>

            <div>
              <dt className="text-muted-foreground mb-1 text-sm font-medium">
                Role
              </dt>
              <dd>
                <Badge variant="secondary" className="capitalize">
                  {user.role || "User"}
                </Badge>
              </dd>
            </div>

            <div>
              <dt className="text-muted-foreground mb-1 text-sm font-medium">
                Email Confirmed
              </dt>
              <dd className="font-medium">
                {user.email_confirmed_at
                  ? formatDate(user.email_confirmed_at)
                  : "Not confirmed"}
              </dd>
            </div>
          </dl>
        </section>

        <Separator />

        {/* Activity Information */}
        <section>
          <header>
            <h3 className="flex items-center gap-2">
              <Clock size={14} />
              Activity Information
            </h3>
          </header>
          <div className="space-y-6">
            <div>
              <dt className="text-muted-foreground mb-1 text-sm font-medium">
                Last Sign In
              </dt>
              <dd>
                <div className="font-medium">
                  {formatDate(user.last_sign_in_at)}
                </div>
                <div className="text-muted-foreground text-sm">
                  {getTimeSince(user.last_sign_in_at)}
                </div>
              </dd>
            </div>

            <div>
              <dt className="text-muted-foreground mb-1 text-sm font-medium">
                Profile Updated
              </dt>
              <dd>
                <div className="font-medium">{formatDate(user.updated_at)}</div>
                <div className="text-muted-foreground text-sm">
                  {getTimeSince(user.updated_at)}
                </div>
              </dd>
            </div>
          </div>
        </section>

        <Separator />

        {/* Additional Metadata */}
        <section>
          <header>
            <h3 className="flex items-center gap-2">
              <Key size={14} />
              Additional Information
            </h3>
          </header>
          <dl className="space-y-6">
            {user.user_metadata &&
            Object.keys(user.user_metadata).length > 0 ? (
              <div>
                <dt className="text-muted-foreground mb-2 text-sm font-medium">
                  User Metadata
                </dt>
                <dd>
                  <pre className="bg-muted overflow-auto rounded p-3 text-xs">
                    {JSON.stringify(user.user_metadata, null, 2)}
                  </pre>
                </dd>
              </div>
            ) : (
              <div className="text-muted-foreground text-sm italic">
                No additional user metadata available
              </div>
            )}

            {user.app_metadata && Object.keys(user.app_metadata).length > 0 && (
              <>
                <div>
                  <dt className="text-muted-foreground mb-2 text-sm font-medium">
                    App Metadata
                  </dt>
                  <dd>
                    <pre className="bg-muted overflow-auto rounded p-3 text-xs">
                      {JSON.stringify(user.app_metadata, null, 2)}
                    </pre>
                  </dd>
                </div>
              </>
            )}

            {user.identities && user.identities.length > 0 && (
              <>
                <div>
                  <dt className="text-muted-foreground mb-2 text-sm font-medium">
                    Identity Providers ({user.identities.length})
                  </dt>
                  <dd className="space-y-2">
                    {user.identities.map((identity, index) => (
                      <Badge
                        key={index}
                        variant="outline"
                        className="capitalize"
                      >
                        {identity.provider}
                      </Badge>
                    ))}
                  </dd>
                </div>
              </>
            )}
          </dl>
        </section>
      </div>

      {dev && (
        <section className="mt-6 border-dashed">
          <header>
            <h3 className="text-muted-foreground text-sm">
              Debug Information (Development Only)
            </h3>
          </header>
          <div>
            <details className="text-xs">
              <summary className="mb-2 cursor-pointer font-medium">
                View Raw User Object
              </summary>
              <pre className="bg-muted overflow-auto rounded p-4 whitespace-pre-wrap">
                {JSON.stringify(user, null, 2)}
              </pre>
            </details>
          </div>
        </section>
      )}
    </div>
  );
}
